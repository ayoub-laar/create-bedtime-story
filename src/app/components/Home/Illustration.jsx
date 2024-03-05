import React from "react"
import { Image } from "@nextui-org/react"

export default function Illustration() {
  return (
    // Ajout de `overflow-x-hidden` pour éviter le défilement horizontal et `max-w-full` pour limiter la largeur de la section
    <section className="relative max-w-full overflow-x-hidden mx-auto md:px-8 flex flex-col justify-center items-center">
        <Image isBlurred src="/images/home_illustration.png" width={500} height={500} />
    </section>
  );
}