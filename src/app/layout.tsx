'use client'

import './globals.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import NavBar from "./components/Home/navbar"
import Footer from "./components/Home/Footer"

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ['latin']
})

// export const metadata: Metadata = {
//   title: 'KidsAdventure: Magical tales',
//   description: 'Give your child a night full of dreams with their favorite characters'
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <div className="flex flex-col min-h-screen">
              <NavBar />
              {children}
              <Footer />
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  )
}
