'use client'

import Hero from "./components/Home/Hero"
import Illustration from "./components/Home/Illustration"
import Faq from "./components/Home/Faq"
import StoryExample from "./components/Home/StoryExample"
import React from "react"

export default function Home() {
    return (
        <main>
            <Hero />
            <Illustration />
            <StoryExample />
            <Faq />
        </main>
    )
}