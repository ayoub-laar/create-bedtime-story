import { createContext, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../hooks/use-local-storage'
import { NavButtons } from "../components/Generate/NavButtons/index"
import { useFormStep } from '../hooks/use-form-step'

type ImagesField = {
  value: string[]
  hasError: boolean
  errorMessage: string
}

type AgeField = {
  value: string
  hasError: boolean
  errorMessage: string
}

const initialCharactersState: ImagesField = {
  value: [],
  hasError: false,
  errorMessage: ''
}

const initialAgeState: AgeField = {
  value: '',
  hasError: false,
  errorMessage: ''
}

type FormContextData = {
  charactersField: ImagesField
  dispatchCharactersField: React.Dispatch<React.SetStateAction<{ type: string; errorMessage?: string, value?: string[] }>>
  ageField: AgeField
  dispatchAgeField: React.Dispatch<React.SetStateAction<{ type: string; errorMessage?: string, value?: string }>>
  clearForm: () => void
}

export const FormContext = createContext({
  charactersField: initialCharactersState,
  dispatchCharactersField: () => { },
  ageField: initialAgeState,
  dispatchAgeField: () => { },
  clearForm: () => { }
} as FormContextData)

export const ACTIONS = {
  SET_VALUE: 'SET_VALUE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

function handleImagesFieldState(
  state: ImagesField,
  action: any
) {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        value: action.value,
        hasError: false,
        errorMessage: ''
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage
      }
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: '',
        hasError: false
      }
    default:
      return state
  }
}

function handleAgeFieldState(
  state: AgeField,
  action: any
) {
  switch (action.type) {
    case ACTIONS.SET_VALUE:
      return {
        ...state,
        value: action.value,
        hasError: false,
        errorMessage: ''
      }
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        hasError: true,
        errorMessage: action.errorMessage
      }
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        errorMessage: '',
        hasError: false
      }
    default:
      return state
  }
}

export type Plan = {
  name: string
  price: number
}

interface FormProviderProps {
  children: React.ReactNode
}

export const FormProvider = ({ children }: FormProviderProps) => {
  // local storage
  const { saveValueToLocalStorage } = useLocalStorage()

  // Your characters
  const [charactersField, dispatchCharactersField] = useReducer(handleImagesFieldState, initialCharactersState)

  // Age
  const [ageField, dispatchAgeField] = useReducer(handleAgeFieldState, initialAgeState)

  const { getValueFromLocalStorage, removeValueFromLocalStorage } = useLocalStorage()

  const { handleNextStep, handlePreviousStep, currentStep } = useFormStep()

  function clearForm() {
    removeValueFromLocalStorage('your-characters')
    removeValueFromLocalStorage('age')

    dispatchCharactersField({ type: ACTIONS.SET_VALUE, value: [] })
    dispatchAgeField({ type: ACTIONS.SET_VALUE, value: '' })
  }

  function validateForm() {
    let formIsValid = true

    if (currentStep === 1 && !charactersField.value.length) {
      dispatchCharactersField({ type: ACTIONS.SET_ERROR, errorMessage: 'Select at least 1 character' })
      formIsValid = false
    }

    if (currentStep === 2 && !ageField.value) {
      dispatchAgeField({ type: ACTIONS.SET_ERROR, errorMessage: 'Select age range' })
      formIsValid = false
    }

    return formIsValid
  }

  function handleGoForwardStep() {
    const isValid = validateForm()
    
    if (isValid) {
      if (currentStep === 1) {
        saveValueToLocalStorage('your-characters', JSON.stringify({
          characters: charactersField
        }))
      }
      if (currentStep === 2) {
        saveValueToLocalStorage('age', JSON.stringify({
          age: ageField
        }))
      }
      handleNextStep()
    } else {
      // Si le formulaire n'est pas valide, effectue le scrolling vers le message d'erreur
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    const YourCharactersFromLocalStorage = getValueFromLocalStorage('your-characters')
    if (YourCharactersFromLocalStorage) {
      dispatchCharactersField({ type: ACTIONS.SET_VALUE, value: YourCharactersFromLocalStorage.characters.value })
    }

    const ageFromLocalStorage = getValueFromLocalStorage('age')
    if (ageFromLocalStorage) {
      dispatchAgeField({ type: ACTIONS.SET_VALUE, value: ageFromLocalStorage })
    }
  }, [])

  const value = {
    charactersField,
    dispatchCharactersField,
    ageField,
    dispatchAgeField,
    clearForm
  }

  return (
    <FormContext.Provider value={{ ...value }}>
      {children}
      <NavButtons
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </FormContext.Provider>
  )
}
