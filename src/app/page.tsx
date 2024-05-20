'use client'

import { FormStep } from "./components/Generate/FormStep"
import { FormProvider } from "./contexts/form"
import { FormStepProvider } from "./contexts/form-step"

export default function Home() {
  return (
    <FormStepProvider>
      <FormProvider>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mx-auto md:text-5xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
            Write your own bedtime story with A.I.{" "}
            <span className="bg-gradient-to-t from-purple-500 via-pink-500 to-white text-transparent bg-clip-text border-none">
              in seconds
            </span>
          </h1>
        </div>
        <div className="mt-16">
          <FormStep />
        </div>
      </FormProvider>
    </FormStepProvider >
  )
}
