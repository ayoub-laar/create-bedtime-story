import "./globals.css";
import { Ubuntu } from "next/font/google";
import NavBar from "./components/Home/NavBar";
import Footer from "./components/Home/Footer";
import Providers from "./providers";
import Script from "next/script";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://createbedtimestory.com"),
  title: "Create a bedtime story in seconds using artificial intelligence",
  description:
    "Create a magical bedtime story for your children with our AI-powered tool. Include characters like Spider-Man, Cinderella, Pikachu, and more. Quick & easy.",
  keywords:
    "bedtime story, bedtime story for kids, short bedtime story, cinderella bedtime story, bedtime story read online, bedtime story quick, story ai, bedtime story ai",
  openGraph: {
    siteName: "CreateBedTimestory.com",
    title: "🦄 Bedtime Story: Magical bedtime stories",
    description:
      "Create a magical bedtime story with his favorite characters like Spider-Man, Cinderella, Pikachu, and more in seconds using our AI-powered tool.",
    images: "/images/home_illustration.png",
  },
  twitter: {
    card: "summary",
    title: "🦄 Bedtime Story: Magical bedtime stories",
    description:
      "Give your child a night full of dreams with his favorite characters.",
    images: "/example.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={ubuntu.className}>
        {/* Google Ads Tracking Script */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16840802251"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-16840802251');
            `,
          }}
        />

        {/* Plausible Analytics */}
        <Script
          defer
          data-domain="createbedtimestory.com"
          src="https://plausible.io/js/script.js"
        />

        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
