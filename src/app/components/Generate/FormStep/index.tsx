import { useFormStep } from "../../../hooks/use-form-step"
import { YourCharacters } from "./YourCharacters"
import { Age } from "./Age"
import ShowStory from "./ShowStory"
import { NavButtons } from "../NavButtons"

const steps = [
  {
    step: 1,
    component: YourCharacters
  },
  {
    step: 2,
    component: Age
  },
  {
    step: 3,
    component: ShowStory
  }
]

export function FormStep() {
  const { currentStep, handlePreviousStep } = useFormStep()

  const step = steps.find(({ step }) => step === currentStep)

  return (
    <div className="py-28 border border-gray-300 rounded-2xl p-4 sm:p-8 my-4 sm:my-8 flex flex-col flex-1 justify-between md:items-center mx-auto max-w-screen-md">
      {step && step.component()}
      <NavButtons
        handleGoBack={handlePreviousStep}
      />
    </div>
  );
}
