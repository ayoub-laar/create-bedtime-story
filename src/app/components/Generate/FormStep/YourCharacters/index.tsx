import { Fragment, useRef, useEffect } from "react"

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

  const images = ['/images/characters/mario_hd.png', '/images/characters/pikachu_hd.png', '/images/characters/spiderman.png', '/images/characters/superman.png', '/images/characters/homer.png', '/images/characters/naruto.png', '/images/characters/shrek.png', '/images/characters/mickey.png', '/images/characters/lion.png']

  // Création d'une référence pour le message d'erreur
  const errorMessageRef = useRef(null);

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
      if (errorMessageRef.current) {
        errorMessageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="SELECT CHARACTERS"
          description="Let your child choose their favorite characters :)"
        />
        <div className="mt-5 flex flex-col gap-4">
          {charactersField.hasError && (
            <span ref={errorMessageRef} className="text-red-600 text-xl sm:text-sm">⚠️ {charactersField.errorMessage}</span>
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
