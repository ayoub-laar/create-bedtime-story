'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@nextui-org/button"
import { useRouter, redirect } from 'next/navigation'
import { useLocalStorage } from '../hooks/use-local-storage'
import { createParser, ParsedEvent, ReconnectInterval, } from 'eventsource-parser'
import router from 'next/router'

export default function Return() {
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [customerEmail, setCustomerEmail] = useState('')
    const [story, setStory] = useState('')

    const getStory = async () => {
        console.log('GET STORY')
        console.log('status complete')
        setLoading(true)
        const { getValueFromLocalStorage } = useLocalStorage()
        const age: string = getValueFromLocalStorage('age')
        const characters: string = getValueFromLocalStorage('your-characters').characters
            .value.map((characterImgfilePath: string) => {
                return characterImgfilePath.split('/images/characters/')[1].split('.png')[0]
            }).toString()
        const prompt = `Generate a wonderful story for a ${age} years-old child featuring ${characters}.`

        console.log('PROMPT: ', prompt)
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
            })
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        // This data is a ReadableStream
        const data = response.body
        if (!data) {
            return
        }

        const onParse = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === 'event') {
                const data = event.data
                try {
                    const text = JSON.parse(data).text ?? ''
                    setStory((prev) => prev + text)
                } catch (e) {
                    console.error(e)
                }
            }
        }

        const reader = data.getReader()
        const decoder = new TextDecoder()
        const parser = createParser(onParse)
        let done = false
        while (!done) {
            const { value, done: doneReading } = await reader.read()
            done = doneReading
            const chunkValue = decoder.decode(value)
            parser.feed(chunkValue)
        }
        setLoading(false)
    }

    useEffect(() => {
        console.log('USE EFFECT')
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get('session_id')

        fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status)
                setCustomerEmail(data.customer_email)
                if (data.status === 'complete') {
                    getStory()
                }
            })
    }, [])

    if (status === 'open') {
        console.log('STATUS OPEN')
        return (
            redirect('/')
        )
    }

    if (status === 'complete') {
        console.log('STATUS COMPLETE')
        return (
            <section id="success">
                <p>
                    We appreciate your business! Your story: {story}.

                    If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
                <Button onClick={() => {
                    // clear form here
                    router.push('/generate')
                }} size="lg" radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                    Get a new story
                </Button>
            </section>
        )
    }
}