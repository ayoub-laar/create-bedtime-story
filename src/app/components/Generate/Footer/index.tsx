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
        <Button size='lg' className="bg-gradient bg-[length:300%_300%] hover:saturate-[1.2] shadow duration-100 border-0 border-transparent bg-transparent animate-shimmer disabled:bg-none disabled:bg-gray-500/30  text-white btn bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-shimmer" color="success" onClick={handleGoForwardStep}>
          GET MY STORY 🪄
        </Button>
      )}
    </footer>
  )
}
