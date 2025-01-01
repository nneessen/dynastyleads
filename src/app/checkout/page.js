'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/features/checkout/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51QWSMCAzbiPyr476ahne6iavC2R1YqsR89ZHRbGat0BMb74ivA3XK8RyRKHmn3biByMxF9dBZHBykU5CW1SyBMl100l1QBGo9e'
);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/checkout/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 5000, currency: 'usd' }) // Example amount (5000 cents = $50)
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options = {
    clientSecret
  };

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  ) : (
    <div>Loading...</div>
  );
};

export default CheckoutPage;
