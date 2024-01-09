/* eslint-disable simple-import-sort/imports */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { memo } from 'react';

import { uuid } from '@/lib/utils';
import useStripePaymentIntent from '@/queries/use-stripe';

import CheckoutForm from '@/features/payment/checkout-form';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

const idempotentKey = uuid();

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
      currencyId: 1,
      code: 'USD',
    },
    description:
      'Estadia en Hotel Test2 Funnel P2.0 del 02 Jun 2023 al 03 Jun 2023. Observacion',
    paymentGatewayId: '1',
    fees: [1, 2],
    propertyFees: [],
    successUrl: '',
    cancelUrl: '',
    idempotentKey,
    offSession: true,
    reservationId: '',
  });

  if (isLoadingPaymentIntent) {
    return <div className='animate-pulse p-4'>Loading...</div>;
  }

  if (isErrorPaymentIntent) {
    return <div className='p-4'>Error</div>;
  }

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
