import { Button } from "@nextui-org/react"
import { useFormStep } from "../../../hooks/use-form-step"

export interface FooterProps {
  handleGoBack: () => void
  handleGoForwardStep?: () => void
}

export function NavButtons({ handleGoBack, handleGoForwardStep }: FooterProps) {
  const { currentStep} = useFormStep()

  return (
    <div className="p-4 flex justify-between items-center bottom-0 left-0 right-0 sm:justify-center">
      {currentStep != 1 ? (
        <Button size='lg' color="default" onClick={handleGoBack}>
          ⏪️ BACK
        </Button>
      ) : ''}
      {currentStep == 3 ? (
        ''
      ) : (
        <Button
          size='lg'
          className={`bg-gradient bg-[length:300%_300%] hover:saturate-[1.2] shadow duration-100 border-0 border-transparent bg-transparent animate-shimmer disabled:bg-none disabled:bg-gray-500/30 text-white btn bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-shimmer ${
            currentStep === 1 ? 'p-[7vw] w-full sm:p-4 sm:w-auto' : ''
          }`}
          color="success"
          onClick={handleGoForwardStep}
        >
          GET MY STORY 🪄
        </Button>
      )}
    </div>
  )
}
