import { createContext, useEffect, useReducer, useState } from 'react'
import { useLocalStorage } from '../hooks/use-local-storage'

type ImagesField = {
  value: string[]
  hasError: boolean
  errorMessage: string
}

// type Field = {
//   value: string
//   hasError: boolean
//   errorMessage: string
// }

const initialState = {
  value: [],
  hasError: false,
  errorMessage: ''
}

type FormContextData = {
  charactersField: ImagesField
  dispatchCharactersField: React.Dispatch<React.SetStateAction<Array<string>>>
  selectedAge: string
  setSelectedAge: React.Dispatch<React.SetStateAction<string>>
  addOns: { title: string, description: string, price: number }[]
  setAddOns: React.Dispatch<React.SetStateAction<{ title: string; description: string; price: number }[]>>
  clearForm: () => void
}

export const FormContext = createContext({
  charactersField: initialState,
  dispatchCharactersField: () => { },
  selectedAge: null as any,
  setSelectedAge: () => { },
  addOns: [],
  setAddOns: () => { },
  clearForm: () => { }
} as FormContextData)

export const ACTIONS = {
  SET_VALUE: 'SET_VALUE',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

function handleFormState(
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
        error: '',
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
  // Your characters
  const [charactersField, dispatchCharactersField] = useReducer(handleFormState, initialState)

  // Age
  const [selectedAge, setSelectedAge] = useState<string>('')

  // Add Ons
  const [addOns, setAddOns] = useState<{ title: string, description: string, price: number }[]>([])

  const { getValueFromLocalStorage, removeValueFromLocalStorage } = useLocalStorage()

  function clearForm() {
    removeValueFromLocalStorage('your-characters')
    removeValueFromLocalStorage('age')
    removeValueFromLocalStorage('add-ons')

    dispatchCharactersField({ type: ACTIONS.SET_VALUE, value: [] })
    setSelectedAge('')
    setAddOns([])
  }

  useEffect(() => {
    const YourCharactersFromLocalStorage = getValueFromLocalStorage('your-characters')
    if (YourCharactersFromLocalStorage) {
      dispatchCharactersField({ type: ACTIONS.SET_VALUE, value: YourCharactersFromLocalStorage.characters.value })
    }

    const ageFromLocalStorage = getValueFromLocalStorage('age')
    console.log('ageFromLocalStorage: ', ageFromLocalStorage)
    if (ageFromLocalStorage) {
      setSelectedAge(ageFromLocalStorage)
    }

    const addOnsFromLocalStorage = getValueFromLocalStorage('add-ons')
    if (addOnsFromLocalStorage) {
      setAddOns(addOnsFromLocalStorage)
    }
  }, [])

  const value = {
    charactersField,
    dispatchCharactersField,
    selectedAge,
    setSelectedAge,
    addOns,
    setAddOns,
    clearForm
  }

  return (
    <FormContext.Provider value={{ ...value }}>
      {children}
    </FormContext.Provider>
  )
}
