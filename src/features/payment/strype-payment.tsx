import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { memo, useEffect } from 'react';

import { uuid } from '@/lib/utils';

import {
  useReservationRequestStore,
  useReservationStore,
  useSelectedRoomtypeStore,
  useUserStore,
} from '@/store';

import { usePropertyQuery, useStripePaymentIntentQuery } from '@/queries';

import CheckoutForm from './checkout-form';
import PaymentSkeleton from './payment-skeleton';

import { CurrencyCode, Payment } from '@/types';

type Props = {
  roomTypeId: number;
};

const stripePromise: Promise<Stripe | null> = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

const idempotentKey = uuid();

const StripePayment = memo(({ roomTypeId }: Props) => {
  const { data: property } = usePropertyQuery();
  const { reservation } = useReservationStore();
  const { setPaymentId, reservationRequest } = useReservationRequestStore();
  const {
    reservation: { total, currency, checkin, checkout },
  } = useReservationStore();
  const {
    selectedRoom: { propertyId },
  } = useSelectedRoomtypeStore();
  const { user } = useUserStore();

  const intentData: Payment = {
    propertyId,
    amount: total,
    clientId: reservation.guestPaxerId,
    email: user?.email,
    currency: {
      currencyId: 1,
      code: currency as CurrencyCode,
    },
    description: `Estadia en ${property.name} del ${checkin} al ${checkout}.`,
    paymentGatewayId: 1,
    fees: [1, 2],
    propertyFees: [],
    successUrl: '',
    cancelUrl: '',
    idempotentKey,
    offSession: true,
    reservationId: '',
    reservationRequestId: reservationRequest.id,
  };

  const {
    data,
    isLoading: isLoadingPaymentIntent,
    isError: isErrorPaymentIntent,
  } = useStripePaymentIntentQuery(intentData);

  useEffect(() => {
    if (data != null) {
      setPaymentId(data.pagId);
    }
  }, [data, setPaymentId]);

  if (isLoadingPaymentIntent) {
    return <PaymentSkeleton />;
  }

  if (isErrorPaymentIntent) {
    return <div className='p-4'>Error</div>;
  }

  return (
    <div data-testid='test-element'>
      {stripePromise && data.clientSecret && (
        <Elements
          options={{ clientSecret: data.clientSecret }}
          stripe={stripePromise}
        >
          <CheckoutForm roomTypeId={roomTypeId} />
        </Elements>
      )}
    </div>
  );
});

export default StripePayment;
