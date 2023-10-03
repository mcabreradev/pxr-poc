import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button';

export default function CheckoutForm() {
  const { t } = useTranslation();

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return setMessage('');
      }
      switch ((paymentIntent as { status: string }).status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error?.message || 'An unexpected error occurred.');
    } else {
      setMessage('An unexpected error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <div className='layout'>
      <form id='payment-form' onSubmit={handleSubmit}>
        <LinkAuthenticationElement id='link-authentication-element' />

        <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />

        <Button
          disabled={isLoading || !stripe || !elements}
          id='submit'
          className='w-full'
        >
          <span id='button-text'>
            {isLoading ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              t('button.pay')
            )}
          </span>
        </Button>
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </div>
  );
}
