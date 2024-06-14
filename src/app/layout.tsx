import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import { Ubuntu } from 'next/font/google'
import NavBar from "./components/Home/NavBar"
import Footer from "./components/Home/Footer"
import Providers from './providers'

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* SEO Google */}
        <title>
          Create a bedtime story in seconds using artificial intelligence
        </title>
        <meta
          name="description"
          content="Create a magical bedtime story for your children with our AI-powered tool. Include characters like Spider-Man, Cinderella, Pikachu, and more. Quick & easy."
        />
        <meta
          name="keywords"
          content="bedtime story, bedtime story for kids, short bedtime story, cinderella bedtime story, bedtime story read online, bedtime story quick, story ai, bedtime story ai"
        />

        {/* SEO (réseaux sociaux) */}
        <meta property="og:site_name" content="CreateBedTimestory.com" />
        <meta
          property="og:title"
          content="🦄 Bedtime Story: Magical bedtime stories"
        />
        <meta
          property="og:description"
          content="Create a magical bedtime story with his favorite characters like Spider-Man, Cinderella, Pikachu, and more in seconds using our AI-powered tool."
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="🦄 Bedtime Story: Magical bedtime stories"
        />
        <meta
          name="twitter:description"
          content="Give your child a night full of dreams with his favorite characters."
        />
        <meta property="og:image" content="/images/home_illustration.png" />
        <meta name="twitter:image" content="/example.jpg" />
        <script
          defer
          data-domain="createbedtimestory.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body className={ubuntu.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            {children}
            <Analytics />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}