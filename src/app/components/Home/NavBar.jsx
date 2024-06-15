"use client"
import {
  Navbar,
  NavbarBrand
} from "@nextui-org/navbar"
import { Image } from "@nextui-org/react"

export default function NavBar() {

  return (
    <Navbar isBlurred maxWidth="xl">
        <NavbarBrand>
        <a className="font-bold text-xl text-bold absolute top-4 left-4 flex gap-2 items-center" id="storyai_logo" data-turbo-permanent="true" href="/">
          <Image loading="lazy" className="w-8 h-8 rounded bg-gradient-to-r from-purple-500 via-pink-500 to-white background-animate" src="/images/book.svg" alt="book icon" width={32} height={32}/>
          <span className="hidden sm:inline">Bedtime Story</span>
        </a>
        </NavbarBrand>
    </Navbar>
  )
}
