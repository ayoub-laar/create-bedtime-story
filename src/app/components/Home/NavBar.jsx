"use client"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/navbar"
import { Link } from "@nextui-org/link"

export default function NavBar() {

  return (
    <Navbar isBlurred maxWidth="xl">
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
        <a class="font-bold text-xl text-bold absolute top-4 left-4 flex gap-2 items-center" id="storyai_logo" data-turbo-permanent="true" href="/">
          <img class="w-8 h-8 rounded bg-gradient-to-r from-purple-500 via-pink-500 to-white background-animate" src="/images/book.svg"/>
          <span class="hidden sm:inline">Kids Adventure</span>
        </a>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-5" justify="center">
        <NavbarBrand>
          <span className="font-bold text-2xl flex gap-3 justify-center items-center">
            KidsAdventure
          </span>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  )
}
