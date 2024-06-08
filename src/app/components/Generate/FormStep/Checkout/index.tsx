import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from "react"
import { useFormStep } from "../../../../hooks/use-form-step"
import Form from "../../Form"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from "@stripe/react-stripe-js"
import { Spinner } from '@nextui-org/react';
import { Stripe, loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("")
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null)

  useEffect(() => {
    const loadStripeInstance = async () => {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');
      setStripePromise(stripe);
    };

    loadStripeInstance();

    fetch("/api/checkout_sessions", {
      method: "POST"
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
          {clientSecret && stripePromise ? (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : (
            <Spinner />
          )}
        </div>
      </Form.Card>
    </Fragment>
  )
}

export default Checkout
