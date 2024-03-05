import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RESERVATION } from '@/constants';

const postReservationRequest = async (body) => {
  const { data } = await axios.post(`/api/reservation-request`, body);
  return data.clientSecret;
};

export default function useReservationRequestMutation(body) {
  return useQuery({
    queryKey: [PROPERTY, RESERVATION],
    queryFn: () => postReservationRequest(body),
    retry: 3,
  });
}
