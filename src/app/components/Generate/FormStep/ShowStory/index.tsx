import { Fragment, useEffect, useState, useRef, useContext } from "react";
import Form from "../../Form";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Button } from "@nextui-org/react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useLocalStorage } from "../../../../hooks/use-local-storage";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import { FormStepContext } from "../../../../contexts/form-step";
import jsPDF from "jspdf";

const ShowStory = () => {
  const {
    getValueFromLocalStorage,
    removeValueFromLocalStorage,
    saveValueToLocalStorage,
  } = useLocalStorage();
  const { moveToStep } = useContext(FormStepContext);
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
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

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      const age = getValueFromLocalStorage("age");

      // if no characters (maybe try to reload a free story with old stripe session)
      if (!getValueFromLocalStorage("your-characters")) {
        router.push("/");
      }

      const characters = getValueFromLocalStorage("your-characters")
        .characters.value.map((characterImgfilePath: string) => {
          return characterImgfilePath
            .split("/images/characters/")[1]
            .split(".webp")[0];
        })
        .toString();
      const prompt = `Generate a wonderful and complete bedtime story for a ${age} years-old kid featuring ${characters}. The story should be detailed and must be broken into paragraphs for better readability. The response should only include the title and the story in the following format without any additional text: "**Title: ...**" "**Story: ...**"`;

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
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
      );
      setStripePromise(stripe);
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

    loadStripeInstance();

    fetch("/api/checkout_sessions", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

    if (!storyFetchedRef.current) {
      if (sessionId) {
        checkPaymentStatus(sessionId);
      } else {
        fetchStory();
      }
      storyFetchedRef.current = true;
    }
  }, [sessionId]);

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
      <p key={index} className="mt-4">
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

  const handleDownloadPDF = () => {
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
    <Fragment>
      <Form.Card>
        <Form.Header title="Your bedtime story 🪄" description="" />
        {paymentSuccess && (
          <p className="mt-4 text-center text-green-500">
            This is the full story. Thank you for your purchase!
          </p>
        )}
        <style jsx>{`
          .card {
            position: relative;
            max-width: 1000px; /* Augmenter la largeur maximale de la carte */
            width: 100%;
            background-color: rgba(
              0,
              0,
              0,
              0.8
            ); /* Fond plus sombre avec une légère transparence */
            color: white; /* Texte en blanc pour le mode sombre */
            border-radius: 8px;
            overflow: hidden; /* Assure que l'effet flouté ne dépasse pas les bords arrondis */
          }
          .card-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1; /* Positionne l'arrière-plan derrière le contenu */
            background-image: url("/images/example.jpg"); /* Votre image de fond */
            background-size: cover;
            background-position: center;
            filter: blur(8px); /* Ajustez le niveau de flou ici */
            opacity: 0.5; /* Réduit l'opacité pour un effet plus subtil en mode sombre */
          }
          .overlay {
            position: absolute;
            top: 0,
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            color: white;
            text-align: center;
          }
          .loader-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-align: center;
          }
          .loader {
            position: relative;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: conic-gradient(
              from 0deg at 50% 50%,
              #ff0075,
              #f0f,
              #0ff,
              #f0f,
              #ff0075
            );
            animation: spin 2s linear infinite, glow 1.5s ease-in-out infinite;
          }
          .loader::before,
          .loader::after {
            content: "";
            position: absolute;
            inset: 6px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.9);
          }
          .loader::after {
            inset: 12px;
            background: rgba(255, 255, 255, 0.1);
          }
          .loader::before {
            animation: pulse 2s ease-in-out infinite;
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          @keyframes glow {
            0%,
            100% {
              box-shadow: 0 0 8px 4px rgba(255, 0, 117, 0.5),
                0 0 12px 6px rgba(240, 0, 255, 0.4),
                0 0 16px 8px rgba(0, 255, 255, 0.3);
            }
            50% {
              box-shadow: 0 0 12px 6px rgba(255, 0, 117, 0.7),
                0 0 16px 8px rgba(240, 0, 255, 0.6),
                0 0 20px 10px rgba(0, 255, 255, 0.5);
            }
          }
          @keyframes pulse {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          .blur-overlay {
            position: absolute;
            top: 0,
            left: 0,
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10;
          }
        `}</style>
        <section className="relative max-w-screen-xl mx-auto py-28 gap-12 md:px-12 flex flex-col justify-center items-center">
          <div className="card">
            <div className="card-background"></div>
            <div className="mt-4">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <p className="mt-4">
                    Generating your magical bedtime story...
                  </p>
                </div>
              ) : (
                <>
                  {title && (
                    <h2 className="text-2xl font-bold text-center mt-4">
                      {title}
                    </h2>
                  )}
                  {paymentSuccess ? (
                    formatStory(story)
                  ) : (
                    <>
                      {formatStory(
                        story.slice(0, Math.floor(story.length * 0.4)) + "..."
                      )}
                      <div className="text-center mt-4">
                        <Button
                          onClick={() => setShowFullStory(true)}
                          size="lg"
                          radius="full"
                          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                          ref={buttonRef}
                        >
                          Show full story
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {!loading && (
            <Button
              onClick={handleCreateNewStory}
              size="lg"
              radius="full"
              className="bg-gradient-to-tr from-blue-500 to-green-500 text-white shadow-lg mt-4"
            >
              Create new story
            </Button>
          )}
          {paymentSuccess && (
            <Button
              onClick={handleDownloadPDF}
              size="lg"
              radius="full"
              className="bg-gradient-to-tr from-purple-500 to-indigo-500 text-white shadow-lg mt-4"
            >
              📁 Download as PDF
            </Button>
          )}
          {showFullStory &&
            !paymentSuccess &&
            clientSecret &&
            stripePromise && (
              <>
                <div className="blur-overlay"></div>
                <div
                  id="checkout"
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{ zIndex: 20 }}
                  ref={paywallRef}
                >
                  <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                  >
                    <EmbeddedCheckout />
                  </EmbeddedCheckoutProvider>
                </div>
              </>
            )}
        </section>
      </Form.Card>
    </Fragment>
  );
};

export default ShowStory;
