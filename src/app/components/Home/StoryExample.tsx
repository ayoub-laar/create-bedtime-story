import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation'

export default function StoryExample() {
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef(null);
    const ref = useRef(null);
    const router = useRouter()

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible && contentRef.current) {
            const originalText = contentRef.current.dataset.text;
            let i = 0;
            const typingEffect = setInterval(() => {
                if (i < originalText.length) {
                    contentRef.current.innerHTML += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typingEffect);
                }
            }, 100); // Ajustez la vitesse de frappe ici
            return () => clearInterval(typingEffect);
        }
    }, [isVisible]);

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
            <section ref={ref} className="relative max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
                <div className="card">
                    <div className="card-background"></div> {/* Arrière-plan flouté */}
                    <div className="flex gap-3">
                        <img
                            alt="Example"
                            className="rounded-sm"
                            src="/images/example.jpg"
                            style={{ width: 40, height: 40 }}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">Example</p>
                        </div>
                    </div>
                    <p ref={contentRef} data-text="In a land where the sun sets in brilliant shades of orange and purple, there was a unique friendship between an electric mouse with lightning powers and a plumber who could leap incredibly high. ⚡️ Pikachu and 🔴 Mario, from their separate worlds, had found a magical portal that connected their lives. One evening, as the stars began to twinkle, they discovered a map leading to the lost treasure of the ..." className="mt-4">
                        {/* Le texte sera inséré ici par l'effet de frappe */}
                    </p>
                    <div className="flex justify-end mt-4">
                        <button onClick={() => { router.push('/generate') }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Get my story
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
