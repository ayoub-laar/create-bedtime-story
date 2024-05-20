import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import Head from "next/head"
import { Ubuntu } from 'next/font/google'
import NavBar from "./components/Home/NavBar"
import Footer from "./components/Home/Footer"
import Providers from './providers'

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>🦄 KidsAdventure: Magical bedtime stories</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Give your child a night full of dreams with their favorite characters"
        />
        <meta property="og:site_name" content="darija.cc" />
        <meta
          property="og:description"
          content="Give your child a night full of dreams with their favorite characters"
        />
        <meta property="og:title" content="🦄 KidsAdventure: Magical bedtime stories" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="🦄 KidsAdventure: Magical bedtime stories" />
        <meta
          name="twitter:description"
          content="Give your child a night full of dreams with their favorite characters."
        />
        <meta
          property="og:image"
          content="/images/home_illustration.png"
        />
        <meta
          name="twitter:image"
          content="/example.jpg"
        />
      </head>
      <body className={ubuntu.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <div className="p-[7vw] pt-[5vh]">
              {children}
            </div>
            <Analytics />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}