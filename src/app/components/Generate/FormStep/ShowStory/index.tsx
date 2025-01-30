import { Fragment, useEffect, useState, useRef } from "react";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";
import { useLocalStorage } from "../../../../hooks/use-local-storage";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { Stripe } from "@stripe/stripe-js";
import { useFormStep } from "@/app/hooks/use-form-step";

const ShowStory = () => {
  const {
    getValueFromLocalStorage,
    removeValueFromLocalStorage,
    saveValueToLocalStorage,
  } = useLocalStorage();
  const { moveToStep } = useFormStep();
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [showFullStory, setShowFullStory] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const storyFetchedRef = useRef(false);
  const buttonRef = useRef(null);
  const paywallRef = useRef(null);
  const [loadingMessage, setLoadingMessage] = useState("Preparing your magical story...");

  const loadingMessages = [
    "✨ Once upon a time...",
    "🌟 Our AI storytellers are crafting your unique tale...",
    "🎨 Adding vibrant characters and magical moments...",
    "📝 Writing the perfect bedtime adventure...",
    "🌙 Making dreams come true...",
  ];

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      const age = getValueFromLocalStorage("age");

      // if no characters (maybe try to reload a free story with old stripe session)
      if (!getValueFromLocalStorage("your-characters")) {
        router.push("/");
        return;
      }

      const characters = getValueFromLocalStorage("your-characters")
        .characters.value.map((characterImgfilePath: string) => {
          return characterImgfilePath
            .split("/images/characters/")[1]
            .split(".webp")[0];
        })
        .toString();
      const prompt = `Generate a wonderful and complete bedtime story for a ${age} years-old kid featuring ${characters}. The story should be detailed, contain emojis and must be broken into paragraphs for better readability. The response should only include the title and the story in the following format without any additional text: "**Title: ...**" "**Story: ...**"`;

      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          try {
            const text = JSON.parse(data).text ?? "";
            setStory((prev) => {
              const newStory = prev + text;
              const { title, formattedStory } = extractTitleAndStory(newStory);
              if (title) {
                setTitle(title);
                saveValueToLocalStorage("storyTitle", title); // Save title to local storage
              }
              saveValueToLocalStorage("currentStory", newStory); // Save story to local storage
              return formattedStory;
            });
          } catch (e) {
            console.error(e);
          }
        }
      };

      const reader = data.getReader();
      const decoder = new TextDecoder();
      const parser = createParser(onParse);
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        parser.feed(chunkValue);
      }
      setLoading(false);
    };

    const loadStripeInstance = async () => {
      const { loadStripe } = await import("@stripe/stripe-js");
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
      );
      setStripePromise(Promise.resolve(stripe));
    };

    const checkPaymentStatus = async (sessionId: string) => {
      if (sessionId) {
        const response = await fetch(
          `/api/checkout_sessions?session_id=${sessionId}`
        );
        const data = await response.json();
        if (data.status === "complete") {
          setPaymentSuccess(true);
          const savedStory = getValueFromLocalStorage("currentStory");
          const savedTitle = getValueFromLocalStorage("storyTitle"); // Retrieve title from local storage
          if (savedStory) {
            const { formattedStory } = extractTitleAndStory(savedStory);
            setStory(formattedStory);
            setTitle(savedTitle); // Set the title from local storage
          }
        }
      }
    };

    const init = async () => {
      await loadStripeInstance();

      fetch("/api/checkout_sessions", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));

      if (!storyFetchedRef.current) {
        if (sessionId) {
          await checkPaymentStatus(sessionId);
        } else {
          fetchStory();
        }
        storyFetchedRef.current = true;
      }
    };

    init();
  }, [sessionId]);

  useEffect(() => {
    if (loading) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        setLoadingMessage(loadingMessages[messageIndex]);
        messageIndex = (messageIndex + 1) % loadingMessages.length;
      }, 3000); // Change message every 3 seconds

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    const savedStory = getValueFromLocalStorage("currentStory");
    const savedTitle = getValueFromLocalStorage("storyTitle"); // Retrieve title from local storage
    if (savedStory) {
      const { formattedStory } = extractTitleAndStory(savedStory);
      setStory(formattedStory);
      setTitle(savedTitle); // Set the title from local storage
    }
  };

  const extractTitleAndStory = (text: string) => {
    const titleRegex = /\*\*Title: (.+?)\*\*\n+\*\*Story:\*\*(.+)/s;
    const titleMatch = text.match(titleRegex);
    let title = "";
    let story = text;
    if (titleMatch) {
      title = titleMatch[1].trim();
      story = titleMatch[2].trim();
    }
    return { title, formattedStory: story };
  };

  const formatStory = (text: string) => {
    return text.split("\n\n").map((paragraph: string, index: number) => (
      <p key={index} className="mt-4 text-lg leading-7">
        {paragraph}
      </p>
    ));
  };

  useEffect(() => {
    if (showFullStory && paywallRef.current) {
      (paywallRef.current as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showFullStory]);

  const handleCreateNewStory = () => {
    removeValueFromLocalStorage("currentStory");
    removeValueFromLocalStorage("age");
    removeValueFromLocalStorage("currentStep");
    removeValueFromLocalStorage("your-characters");
    removeValueFromLocalStorage("storyTitle"); // Remove title from local storage
    moveToStep(1);
    router.push("/");
  };

  const handleDownloadPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
    const textWidth = doc.internal.pageSize.width - 2 * margin;

    // Add custom header
    doc.setFontSize(18);
    doc.text("CreateBedtimeStory.com", margin, margin + 10);

    // Add story title
    doc.setFontSize(16);
    doc.text(title, margin, margin + 30);

    // Add story text
    doc.setFontSize(12);
    let y = margin + 40;
    const storyLines = doc.splitTextToSize(story, textWidth);
    storyLines.forEach((line: string) => {
      if (y + 10 > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 10;
    });

    doc.save("bedtime-story.pdf");
  };

  return (
    <div className="bg-black">
      {/* Bouton Back toujours visible */}
      <div className="p-4">
        <Button
          onClick={() => router.push("/")}
          className="bg-gray-800/50 hover:bg-gray-700/50 text-white"
          size="lg"
        >
          ← Back
        </Button>
      </div>

      {loading ? (
        // Écran de chargement - plus compact
        <div className="flex flex-col items-center justify-center py-12">
          {/* Animation des étoiles */}
          <div className="relative h-16 w-16 mb-6">
            <div className="absolute inset-0 animate-spin-slow">
              <span className="absolute text-3xl">✨</span>
              <span className="absolute text-3xl" style={{ left: '75%', top: '25%' }}>✨</span>
              <span className="absolute text-3xl" style={{ left: '25%', top: '75%' }}>✨</span>
            </div>
          </div>
          
          {/* Message de chargement */}
          <h2 className="text-2xl font-bold text-white mb-2">{loadingMessage}</h2>
          <p className="text-gray-400 text-sm">This usually takes about 30 seconds...</p>
        </div>
      ) : (
        // Histoire générée
        <div className="container mx-auto px-4 pb-8 text-white">
          {title && (
            <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
          )}
          
          <div className="prose prose-lg prose-invert mx-auto">
            {paymentSuccess ? (
              formatStory(story)
            ) : (
              <>
                {formatStory(story.slice(0, Math.floor(story.length * 0.4)) + "...")}
                <div className="text-center mt-12">
                  <Button
                    onClick={() => setShowFullStory(true)}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  >
                    Continue Reading
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <Button
              onClick={handleCreateNewStory}
              size="lg"
              className="bg-gray-800 text-white"
            >
              Create New Story
            </Button>
            {paymentSuccess && (
              <Button
                onClick={handleDownloadPDF}
                size="lg"
                className="bg-green-600 text-white"
              >
                Download PDF
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Modal Stripe */}
      {showFullStory && !paymentSuccess && clientSecret && stripePromise && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded-lg relative">
            <Button
              onClick={() => setShowFullStory(false)}
              className="absolute -top-4 -right-4 z-50 min-w-0 w-8 h-8 bg-gray-800 text-white rounded-full"
              size="sm"
            >
              ✕
            </Button>
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowStory;
