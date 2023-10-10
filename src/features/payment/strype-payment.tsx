/* eslint-disable simple-import-sort/imports */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { memo } from 'react';

import useStripePaymentIntent from '@/hooks/use-stripe.query';
import { uuid } from '@/lib/utils';

import CheckoutForm from '@/features/payment/checkout-form';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

const StripePayment = memo(() => {
  const {
    data: clientSecret,
    isLoading: isLoadingPaymentIntent,
    isError: isErrorPaymentIntent,
  } = useStripePaymentIntent({
    propertyId: '219',
    amount: 100000,
    clientId: 2334,
    email: 'hector@paxer.com',
    currency: {
      monId: 4,
      code: 'CLP',
    },
    description:
      'Estadia en Hotel Test2 Funnel P2.0 del 02 Jun 2023 al 03 Jun 2023. Observacion',
    paymentGatewayId: '1',
    fees: [1, 2],
    propertyFees: [],
    successUrl: '',
    cancelUrl: '',
    idempotentKey: uuid(),
    offSession: true,
    reservationId: '',
  });

  if (isLoadingPaymentIntent) return <div>Loading...</div>;
  if (isErrorPaymentIntent) return <div>Error</div>;

  return (
    <div data-testid='test-element'>
      {stripePromise && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
});

export default StripePayment;
