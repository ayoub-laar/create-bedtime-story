import { Button } from "@nextui-org/react"
import { useFormStep } from "../../../hooks/use-form-step"

interface FooterProps {
  handleGoBack: () => void
  handleGoForwardStep?: () => void
}

export function Footer({ handleGoBack, handleGoForwardStep }: FooterProps) {
  const { currentStep, steps } = useFormStep()

  const numberOfSteps = steps.length
  const isLastStep = currentStep === numberOfSteps

  return (
    <footer className="p-4 bg-slate-50 flex justify-between items-center fixed bottom-0 left-0 right-0">
      {currentStep === 1 ? (
        <div className="opacity-0">
          BACK
        </div>
      ) : (
        <Button size='lg' color="default" onClick={handleGoBack}>
          ⏪️ BACK
        </Button>
      )}
      {currentStep == 3 ? (
        <button
          onClick={handleGoForwardStep}
          className="bg-purple py-3 px-4 rounded text-sm text-white font-medium sm:text-base"
        >
          Confirm
        </button>
      ) : (
        <Button size='lg' color="success" onClick={handleGoForwardStep}>
          NEXT 🧙🏼
        </Button>
      )}
    </footer>
  )
}
