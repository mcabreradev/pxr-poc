import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RESERVATION } from '@/constants';

import { ReservationRequest } from '@/types';

const postReservationRequest = async (params) => {
  const { data } = await axios.post(
    `/api/reservation-request?params={"reservationRequest":${JSON.stringify(params)}}`,
  );
  return data;
};

export default function useReservationRequestMutation() {
  return useMutation({
    mutationKey: [PROPERTY, RESERVATION],
    mutationFn: (params: ReservationRequest) => postReservationRequest(params),
    retry: 3,
  });
}
