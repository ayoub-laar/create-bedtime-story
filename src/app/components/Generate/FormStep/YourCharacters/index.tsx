import { Fragment } from "react"

import { useFormStep } from "../../../../hooks/use-form-step"
import { useLocalStorage } from "../../../../hooks/use-local-storage"
import { useForm } from "../../../../hooks/use-form"
import { ACTIONS } from "../../../../contexts/form"
import Form from "../../Form"
import { Footer } from "../../Footer"
import { ImagesInput } from "../../Form/ImagesInput"

export function YourCharacters() {
  const {
    charactersField,
    dispatchCharactersField
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  const images = ['/images/characters/Mario\\\ Bros.png', '/images/characters/Pikachu.png', '/images/characters/Elsa.png', '/images/characters/Raiponce.png', '/images/characters/Spider-man.png', '/images/characters/Super-man.png', '/images/characters/Homer\\\ Simpson.png', '/images/characters/Naruto.png', '/images/characters/Shrek.png', '/images/characters/Barbie.png', '/images/characters/Mickey\\\ Mouse.png', '/images/characters/The\\\ Lion\\\ King.png']

  function validateForm() {
    let formHasError = false

    if (!charactersField.value.length) {
      dispatchCharactersField({ type: ACTIONS.SET_ERROR, errorMessage: 'Select at least 1 characters' })
      formHasError = true
    }

    return !formHasError
  }

  function handleGoForwardStep() {
    const isValid = validateForm()
    if (isValid) {
      saveValueToLocalStorage('your-characters', JSON.stringify({
        characters: charactersField
      }))
      handleNextStep()
    } else {
      // Si le formulaire n'est pas valide, effectue le scrolling vers le message d'erreur
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Who are your child's favorite characters?"
          description=""
        />
        <div className="mt-5 flex flex-col gap-4">
          {charactersField.hasError && (
            <span className="text-red-600 text-xl sm:text-sm">⚠️ {charactersField.errorMessage}</span>
          )}
          <ImagesInput
            images={images}
            value={charactersField.value}
            onChange={(value: string[]) => dispatchCharactersField({ type: ACTIONS.SET_VALUE, value })}
            errorMessage={charactersField.errorMessage}
            clearError={() => dispatchCharactersField({ type: ACTIONS.CLEAR_ERROR })}
            hasError={charactersField.hasError}
          />
        </div>

      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
}
