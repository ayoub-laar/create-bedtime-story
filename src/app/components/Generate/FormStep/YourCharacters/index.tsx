import { Fragment } from "react"
import { useForm } from "../../../../hooks/use-form"
import { ACTIONS } from "../../../../contexts/form"
import Form from "../../Form"
import { ImagesInput } from "../../Form/ImagesInput"

export function YourCharacters() {
  const {
    charactersField,
    dispatchCharactersField
  } = useForm()

  const images = ['/images/characters/Mario\\\ Bros.png', '/images/characters/Pikachu.png', '/images/characters/Elsa.png', '/images/characters/Raiponce.png', '/images/characters/Spider-man.png', '/images/characters/Super-man.png', '/images/characters/Homer\\\ Simpson.png', '/images/characters/Naruto.png', '/images/characters/Shrek.png', '/images/characters/Barbie.png', '/images/characters/Mickey\\\ Mouse.png', '/images/characters/The\\\ Lion\\\ King.png']

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Who are your child's favorite characters?"
          description=""
        />
        <p className="text-xl text-gray-500">Choose multiple characters to mix them together.</p>
        <div className="mt-5 flex flex-col gap-4">
          {charactersField.hasError && (
            <span className="text-red-600 text-xl sm:text-sm">⚠️ {charactersField.errorMessage}</span>
          )}
          <ImagesInput
            images={images}
            value={charactersField.value}
            onChange={(value: string[]) => dispatchCharactersField({ type: ACTIONS.SET_VALUE, value })}
          />
        </div>
      </Form.Card>
    </Fragment>
  )
}
