import React from "react"
import { Image } from "@nextui-org/react"

export default function Illustration() {
  return (
    <section className="relative max-w-screen-xl mx-auto md:px-8 flex flex-col justify-center items-center">
        <Image isBlurred src="/images/illustration.png" width={500} height={500} />
    </section>
  );
}
