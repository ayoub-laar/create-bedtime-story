import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import NavBar from "./components/Home/NavBar"
import Footer from "./components/Home/Footer"
import Providers from './providers'

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'KidsAdventure: Magical tales',
  description: 'Give your child a night full of dreams with their favorite characters'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
