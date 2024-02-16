import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RESERVATION } from '@/constants';

const fetchReservaction = async (body) => {
  const { data } = await axios.post(`/api/reservation`, body);
  return data.clientSecret;
};

export default function useReservationQuery(body) {
  return useQuery({
    queryKey: [PROPERTY, RESERVATION],
    queryFn: () => fetchReservaction(body),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
