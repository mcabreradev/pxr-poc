import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { GUEST } from '@/constants';

import { GuestPegaso } from '@/types';

const postCheckGuest = async (body: GuestPegaso) => {
  const { data } = await axios.post(`/api/check-guest`, body);
  return data;
};

export default function useCheckGuestMutation() {
  return useMutation({
    mutationKey: [GUEST],
    mutationFn: postCheckGuest,
  });
}
