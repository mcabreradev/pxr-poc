import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import usePaymentQuery from '@/hooks/use-payment.query';

import CheckoutForm from '@/features/payment/checkout';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

export default function PageComponent() {
  // const [clientSecret, setClientSecret] = useState('');

  // const fetchClientSecret = async () => {
  //   const res = await fetch('/api/payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
  //   });
  //   const data = await res.json();
  //   setClientSecret(data.clientSecret);
  // };
  // useEffect(() => {
  //   fetchClientSecret();
  // }, []);

  const { data: clientSecret, isLoading, isError } = usePaymentQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const appearance = {
    theme: 'stripe',
  };

  return (
    <div data-testid='test-element'>
      {clientSecret && (
        <Elements
          options={{ clientSecret, ...appearance }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
