import { Fragment, useEffect, useState } from "react"
import { Footer } from "../../Footer"
import { useFormStep } from "../../../../hooks/use-form-step"
import Form from "../../Form"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');

export function Checkout() {
  const { handlePreviousStep } = useFormStep()
  const [clientSecret, setClientSecret] = useState("")

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
          description=""
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
        handleGoBack={handlePreviousStep}
      />
    </Fragment>
  )
}