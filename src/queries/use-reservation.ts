import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RESERVATION } from '@/constants';

const createPaymentIntent = async (body) => {
  const { data } = await axios.post(`/api/reservation`, body);
  return data.clientSecret;
};

export default function useReservation(body) {
  return useQuery({
    queryKey: [PROPERTY, RESERVATION],
    queryFn: () => createPaymentIntent(body),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
