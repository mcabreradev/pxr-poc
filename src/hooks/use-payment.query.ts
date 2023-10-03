import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PAYMENT, PROPERTY } from '@/constant';

const postPayment = async () => {
  const { data } = await axios.post(`/api/payment-intent`);
  return data.clientSecret;
};

export default function usePaymentQuery() {
  return useQuery({
    queryKey: [PROPERTY, PAYMENT],
    queryFn: () => postPayment(),
  });
}
