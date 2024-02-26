"use client";
import { motion } from "framer-motion";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react"
import {Image} from "@nextui-org/react"

export default function Illustration() {
  return (
    <div className="relative justify-center items-center">
      <section>
        <Image
          isBlurred
          width={"100%"}
          height={"100%"}
          alt="NextUI hero Image with delay"
          src="/images/illustration.png"
          className="md:w-1/2"
        />
      </section>
    </div>
  );
}
