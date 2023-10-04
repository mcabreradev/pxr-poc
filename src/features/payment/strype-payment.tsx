import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import usePaymentQuery from '@/hooks/use-payment.query';

import CheckoutForm from '@/features/payment/checkout-form';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

export default function StripePayment() {
  const { data: clientSecret, isLoading, isError } = usePaymentQuery();

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
