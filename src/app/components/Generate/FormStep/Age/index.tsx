import { Fragment } from "react"
import { Footer } from "../../Footer"
import Form from "../../Form"
import { useFormStep } from "../../../../hooks/use-form-step"
import { useLocalStorage } from "../../../../hooks/use-local-storage"
import { useForm } from "../../../../hooks/use-form"
import { RadioGroup, Radio } from "@nextui-org/react"

export function Age() {
  const {
    selectedAge,
    setSelectedAge
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  function handleGoForwardStep() {
    if (!selectedAge) {
      return
    }
    saveValueToLocalStorage('age', selectedAge)
    handleNextStep()
  }

  function handleSelectedAge(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedAge(e.target.value)
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select age range"
          description="To make the story unique" //todo
        />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <RadioGroup
            color="primary"
            defaultValue={selectedAge ?? '4/5'}
            onChange={handleSelectedAge}
          >
            <Radio value="2/3">2/3 years old</Radio>
            <Radio value="4/5">4/5 years old</Radio>
            <Radio value="6/7">6/7 years old</Radio>
            <Radio value="8/9">8/9 years old</Radio>
            <Radio value="10">10+ years old</Radio>
          </RadioGroup>
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
}