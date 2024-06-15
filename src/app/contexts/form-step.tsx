import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

type FormStepContextData = {
  currentStep: number;
  steps: { title: string; number: number }[];
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  moveToStep: (step: number) => void;
};

export const FormStepContext = createContext<FormStepContextData>({
  currentStep: 1,
  steps: [],
  handleNextStep: () => {},
  handlePreviousStep: () => {},
  moveToStep: () => {},
});

interface FormStepProviderProps {
  children: React.ReactNode;
}

export const FormStepProvider = ({ children }: FormStepProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps] = useState([
    { title: "Your characters", number: 1 },
    { title: "Age", number: 2 },
    { title: "ShowStory", number: 3 },
  ]);

  const { getValueFromLocalStorage, saveValueToLocalStorage } =
    useLocalStorage();

  useEffect(() => {
    const step = getValueFromLocalStorage("currentStep");
    if (step) setCurrentStep(Number(step));

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "currentStep") {
        setCurrentStep(Number(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [getValueFromLocalStorage]);

  const handleNextStep = () => {
    // Scroll to top of the page
    document.documentElement.scrollIntoView({ behavior: "smooth" });

    const newStepValue = currentStep + 1;
    if (currentStep < steps.length) {
      setCurrentStep(newStepValue);
      saveValueToLocalStorage("currentStep", `${newStepValue}`);
    }
  };

  const handlePreviousStep = () => {
    const newStepValue = currentStep - 1;
    if (currentStep > 1) {
      setCurrentStep(newStepValue);
      saveValueToLocalStorage("currentStep", `${newStepValue}`);
    }
  };

  const moveToStep = (step: number) => {
    setCurrentStep(step);
    saveValueToLocalStorage("currentStep", `${step}`);
  };

  return (
    <FormStepContext.Provider
      value={{
        steps,
        currentStep,
        handleNextStep,
        handlePreviousStep,
        moveToStep
      }}
    >
      {children}
    </FormStepContext.Provider>
  );
};

