'use client'

import Hero from "./components/Home/Hero"
import Illustration from "./components/Home/Illustration"
import Faq from "./components/Home/Faq"
import StoryCard from "./components/Home/StoryCard"
import React from "react"

export default function Home() {
    return (
        <main>
            <Hero />
            <Illustration />
            <StoryCard />
            <Faq />
        </main>
    )
}