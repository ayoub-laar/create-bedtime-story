import { Fragment } from "react"
import Form from "../../Form"
import { useForm } from "../../../../hooks/use-form"
import { RadioGroup, Radio } from "@nextui-org/react"
import { ACTIONS } from "@/app/contexts/form"

export function Age() {
  const {
    ageField,
    dispatchAgeField
  } = useForm()

  function handleSelectedAge(e: React.ChangeEvent<HTMLInputElement>) {
    dispatchAgeField({ type: ACTIONS.SET_VALUE, value: e.target.value })
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Select age range"
          description="To make the story unique" //todo
        />
        aa
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        {ageField.hasError && (
            <span className="text-red-600 text-xl sm:text-sm">⚠️ {ageField.errorMessage}</span>
          )}
          <RadioGroup
            color="primary"
            defaultValue={ageField.value ?? '4/5'}
            onChange={handleSelectedAge}
          >
            <Radio value="2/3">2-3 years old</Radio>
            <Radio value="4/5">4-5 years old</Radio>
            <Radio value="6/7">6-7 years old</Radio>
            <Radio value="8/9">8-9 years old</Radio>
            <Radio value="10">10+ years old</Radio>
          </RadioGroup>
        </div>
      </Form.Card>
    </Fragment>
  )
}