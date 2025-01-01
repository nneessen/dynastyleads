'use client';

import { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
// Adjust these imports to match your actual UI component paths
import Button from '@/ui/Button';
import Form from '@/ui/Form';

const FormContainer = styled.div`
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  color: var(--color-grey-900);
  padding: 2rem;
  margin: 2rem;
`;

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setErrorMessage('');

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://app.dynastyleads.com/order/complete'
      },
      redirect: 'if_required'
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    // If payment requires a redirect, Stripe will handle it automatically.
    // Otherwise, paymentIntent will be available here with status="succeeded" (or another status).
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Optionally trigger local state updates, show a success message, etc.
      setIsLoading(false);
      // You can also do something like:
      // router.push('/thank-you') if you don’t want to rely on Stripe’s redirect.
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <PaymentElement />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <Button
          $size="small"
          $variation="primary"
          disabled={!stripe || isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </Button>
      </Form>
    </FormContainer>
  );
}
