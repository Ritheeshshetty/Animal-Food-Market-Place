import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) return;

  setIsLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: window.location.origin + "/payment-success",
    },
  });

  if (error) {
    setMessage(error.message);
    setIsLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="payment-button"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
      {message && <div className="payment-error">{message}</div>}
    </form>
  );
}
