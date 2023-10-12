import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PAYMENT, PROPERTY } from '@/constant';

import { Payment } from '@/types';

const createPaymentIntent = async (body: Payment) => {
  const { data } = await axios.post(`/api/payment-intent`, body);
  return data.clientSecret;
};

export default function useStripePaymentIntent(body: Payment) {
  return useQuery({
    queryKey: [PROPERTY, PAYMENT],
    queryFn: () => createPaymentIntent(body),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
