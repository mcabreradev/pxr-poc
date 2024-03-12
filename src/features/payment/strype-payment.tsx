import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { memo } from 'react';

import { uuid } from '@/lib/utils';

import { useStripePaymentIntentQuery } from '@/queries';

import CheckoutForm from './checkout-form';
import PaymentSkeleton from './payment-skeleton';

type Props = {
  roomTypeId: number;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

const idempotentKey = uuid();

const StripePayment = memo(({ roomTypeId }: Props) => {
  const {
    data: clientSecret,
    isLoading: isLoadingPaymentIntent,
    isError: isErrorPaymentIntent,
  } = useStripePaymentIntentQuery({
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
    return <PaymentSkeleton />;
  }

  if (isErrorPaymentIntent) {
    return <div className='p-4'>Error</div>;
  }

  return (
    <div data-testid='test-element'>
      {stripePromise && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm roomTypeId={roomTypeId} />
        </Elements>
      )}
    </div>
  );
});

export default StripePayment;
