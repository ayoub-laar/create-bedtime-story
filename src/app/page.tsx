'use client'

import Footer from "./components/Home/Footer";
import Hero from "./components/Home/hero";
import NavBar from "./components/Home/navbar";
import Pricing from "./components/Home/pricing";
import Partners from "./components/Home/partners";
import Faq from "./components/Home/faq";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import React from "react"
import { Card, CardFooter, Image, Button } from "@nextui-org/react"

export default function Home() {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <div className="flex flex-col min-h-screen">
                    <NavBar />
                    <main>
                        <Hero />
                        <Image
                            width={"100%"}
                            height={"100%"}
                            alt="NextUI hero Image with delay"
                            src="/images/aaaa.png"
                        />
                        <Faq />
                    </main>
                    <Footer />
                </div>
            </NextThemesProvider>
        </NextUIProvider>
    );
}