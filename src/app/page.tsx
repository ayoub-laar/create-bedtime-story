'use client'

import Hero from "./components/Home/hero";
import Illustration from "./components/Home/illustration";
import Faq from "./components/Home/faq";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import React from "react"

export default function Home() {
    return (
        <main>
            <Hero />
            <Illustration />
            <Faq />
        </main>
    );
}