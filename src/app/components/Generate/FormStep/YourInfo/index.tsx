'use client';

import { Fragment, useState } from "react";

import { useFormStep } from "../../../../hooks/use-form-step";
import { useLocalStorage } from "../../../../hooks/use-local-storage";
import { useForm } from "../../../../hooks/use-form";
import { ACTIONS } from "../../../../contexts/form";

import { TextInput } from "../../Form/TextInput";
import Form from "../../Form";
import { Footer } from "../../Footer";
import { Image } from "@nextui-org/react"

export function YourInfo() {
  const {
    nameField,
    dispatchNameField,
    emailField,
    dispatchEmailField,
    phoneNumberField,
    dispatchPhoneNumberField
  } = useForm()

  const { handleNextStep, handlePreviousStep } = useFormStep()

  const { saveValueToLocalStorage } = useLocalStorage()

  const images = ['/images/mario_hd.png', '/images/pikachu_hd.png']

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const toggleSelection = (url: string) => {
    if (selectedImages.includes(url)) {
      setSelectedImages(selectedImages.filter(image => image !== url));
    } else {
      setSelectedImages([...selectedImages, url]);
    }
  }

  function validateForm() {
    let formHasError = false

    if (!nameField.value) {
      dispatchNameField({ type: ACTIONS.SET_ERROR, errorMessage: 'Name is required' })
      formHasError = true
    }

    if (!emailField.value) {
      dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is required' })
      formHasError = true
    } else {
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(emailField.value)) {
        dispatchEmailField({ type: ACTIONS.SET_ERROR, errorMessage: 'Email is invalid' })
        formHasError = true
      }
    }

    if (!phoneNumberField.value) {
      dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is required' })
      formHasError = true
    } else {
      if (phoneNumberField.value.length < 6) {
        dispatchPhoneNumberField({ type: ACTIONS.SET_ERROR, errorMessage: 'Phone number is invalid' })
        formHasError = true
      }
    }

    return !formHasError
  }

  function handleGoForwardStep() {
    const isValid = validateForm()
    if (isValid) {
      saveValueToLocalStorage('your-info', JSON.stringify({
        name: nameField.value,
        email: emailField.value,
        phoneNumber: phoneNumberField.value
      }))
      handleNextStep()
    }
  }

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="SELECT CHARACTERS"
          description="Let your child choice the characters is he prefer :)"
        />
        <div className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 p-4">
            {images.map((image, index) => (
              <div key={index} className={`border-4 ${selectedImages.includes(image) ? 'border-sky-500' : 'border-white'} cursor-pointer`} onClick={() => toggleSelection(image)}>
                <Image src={image} alt={`Image ${index + 1}`} width={585} height={390} style={{ opacity: selectedImages.includes(image) ? 1 : 0.3 }} />
              </div>
            ))}
          </div>
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleGoForwardStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
} 