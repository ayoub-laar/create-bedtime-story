'use client'

import { FormStep } from "../components/Generate/FormStep"
import { FormProvider } from "../contexts/form"
import { FormStepProvider } from "../contexts/form-step"

export default function Home() {
  return (
    <FormStepProvider>
      <FormProvider>
        <main className="py-28">
          <FormStep />
        </main >
      </FormProvider>
    </FormStepProvider>
  )
}
