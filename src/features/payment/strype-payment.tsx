/* eslint-disable simple-import-sort/imports */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import useStripePaymentIntent from '@/hooks/use-stripe.query';
import { uuid } from '@/lib/utils';

import CheckoutForm from '@/features/payment/checkout-form';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

export default function StripePayment() {
  const {
    data: clientSecret,
    isLoading,
    isError,
  } = useStripePaymentIntent({
    propertyId: '210',
    reservationId: '4103',
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
    idempotentKey: uuid(),
    successUrl:
      'https://rcamargo.paxer.com/guest/reservation/processstripetransaction?hot_id=210&bookingID=4054&lang=es',
    cancelUrl:
      'https://rcamargo.paxer.com/guest/reservation/processstripetransaction?hot_id=210&bookingID=4054&lang=es',
    offSession: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  // const appearance = {
  //   theme: 'stripe',
  //   layout: {
  //     type: 'accordion',
  //     defaultCollapsed: false,
  //     radios: true,
  //     spacedAccordionItems: false,
  //   },
  // };

  return (
    <div data-testid='test-element'>
      {stripePromise && clientSecret && (
        <Elements options={{ clientSecret }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
