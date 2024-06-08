import { createContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/use-local-storage'
import { useForm } from '../hooks/use-form';
import { ACTIONS } from './form';

type FormStepContextData = {
  currentStep: number;
  steps: { title: string; number: number }[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  moveToStep(step: number): void;
}

export const FormStepContext = createContext({
  currentStep: 2,
  steps: [],
  handleNextStep: () => { },
  handlePreviousStep: () => { },
  moveToStep: () => { },
} as FormStepContextData);

interface FormStepProviderProps {
  children: React.ReactNode;
}

export const FormStepProvider = ({ children }: FormStepProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, _] = useState([
    { title: 'Your characters', number: 1 },
    { title: 'Age', number: 2 },
    { title: 'Checkout', number: 3 },
    { title: 'Download', number: 4 },
  ])

  const { getValueFromLocalStorage, saveValueToLocalStorage } = useLocalStorage()

  useEffect(() => {
    const step = getValueFromLocalStorage('currentStep')
    if (step) setCurrentStep(step)
  }, [getValueFromLocalStorage])

  const handleNextStep = () => {
    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    const newStepValue = currentStep + 1;
    if (currentStep < steps.length) {
      setCurrentStep(newStepValue);
      saveValueToLocalStorage('currentStep', `${newStepValue}`)
    };
  };

  const handlePreviousStep = () => {
    const newStepValue = currentStep - 1;
    if (currentStep > 1) {
      setCurrentStep(newStepValue);
      saveValueToLocalStorage('currentStep', `${newStepValue}`)
    }
  };

  const moveToStep = (step: number) => {
    setCurrentStep(step);
    saveValueToLocalStorage('currentStep', `${step}`)
  }

  return (
    <FormStepContext.Provider value={{ steps, currentStep, handleNextStep, handlePreviousStep, moveToStep }}>
      {children}
    </FormStepContext.Provider>
  );
};
