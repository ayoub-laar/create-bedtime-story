import { Fragment, useEffect } from "react"
import { Footer } from "../../Footer"
import { useFormStep } from "../../../../hooks/use-form-step"
import Form from "../../Form"
import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js"
// import CheckoutForm from "./CheckoutForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

export function Checkout() {
  const { handleNextStep, handlePreviousStep } = useFormStep()
  const [clientSecret, setClientSecret] = React.useState("")

  useEffect(() => {
    fetch("/api/checkout_sessions", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (
    <Fragment>
      <Form.Card>
        <Form.Header
          title="Checkout"
          description="" //todo
        />
        <div id="checkout" className="mt-10 flex flex-col gap-3 sm:flex-row">
          {clientSecret && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </Form.Card>
      <Footer
        handleGoForwardStep={handleNextStep}
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
}