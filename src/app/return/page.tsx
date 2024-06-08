'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@nextui-org/button"
import { useRouter, redirect } from 'next/navigation'
import { useLocalStorage } from '../hooks/use-local-storage'
import { createParser, ParsedEvent, ReconnectInterval, } from 'eventsource-parser'

export default function Return() {
    const { getValueFromLocalStorage, removeValueFromLocalStorage } = useLocalStorage()
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    // const [customerEmail, setCustomerEmail] = useState('')
    const [story, setStory] = useState('')
    const router = useRouter()

    const getStory = async () => {
        setLoading(true)
        const age: string = getValueFromLocalStorage('age')

        // if no characters (maybe try te reload an free story with old stripe session)
        if (!getValueFromLocalStorage('your-characters')) {
            router.push('/')
        }

        const characters: string = getValueFromLocalStorage('your-characters').characters
            .value.map((characterImgfilePath: string) => {
                return characterImgfilePath.split('/images/characters/')[1].split('.webp')[0]
            }).toString()
        const prompt = `Generate a wonderful bedtime story for a ${age} years-old child featuring ${characters}.`

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
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get('session_id')

        fetch(`/api/checkout_sessions?session_id=${sessionId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status)
                // setCustomerEmail(data.customer_email)
                if (data.status === 'complete') {
                    getStory()
                }
            })
    }, [])

    if (status === 'open') {
        return (
            redirect('/')
        )
    }

    if (status === 'complete') {
        return (
            <>
                <style jsx>{`
                .card {
                    position: relative;
                    max-width: 400px;
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.8); /* Fond plus sombre avec une légère transparence */
                    color: white; /* Texte en blanc pour le mode sombre */
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5); /* Ombre plus marquée pour le mode sombre */
                    overflow: hidden; /* Assure que l'effet flouté ne dépasse pas les bords arrondis */
                }
                .card-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1; /* Positionne l'arrière-plan derrière le contenu */
                    background-image: url('/images/example.jpg'); /* Votre image de fond */
                    background-size: cover;
                    background-position: center;
                    filter: blur(8px); /* Ajustez le niveau de flou ici */
                    opacity: 0.5; /* Réduit l'opacité pour un effet plus subtil en mode sombre */
                }
            `}</style>
                <section className="relative max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
                    <div className="card">
                        <div className="card-background"></div> {/* Arrière-plan flouté */}
                        <div className="flex gap-3">
                            <img
                                alt="My story"
                                className="rounded-sm"
                                src="/images/example.jpg"
                                style={{ width: 40, height: 40 }}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">My story</p>
                            </div>
                        </div>
                        <p className="mt-4">
                            {story}
                        </p>
                        {!loading ? <div className="flex justify-end mt-4">
                            <button onClick={() => {
                                // removeValueFromLocalStorage('age')
                                // removeValueFromLocalStorage('currentStep')
                                // removeValueFromLocalStorage('your-characters')
                                // router.push('/') //
                            }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                📄 Download PDF
                            </button>
                        </div> : ''}
                    </div>
                    <Button onClick={() => {
                        removeValueFromLocalStorage('age')
                        removeValueFromLocalStorage('currentStep')
                        removeValueFromLocalStorage('your-characters')
                        router.push('/')
                    }} size="lg" radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                        Get a new story
                    </Button>
                </section>
            </>
        )
    }
}