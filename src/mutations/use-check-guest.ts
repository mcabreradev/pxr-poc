import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { GUEST } from '@/constants';

const checkGuest = async (body) => {
  const { data } = await axios.post(`/api/check-guest`, body);
  return data;
};

export default function useCheckGuest(body) {
  return useMutation({
    mutationKey: [GUEST],
    mutationFn: () => checkGuest(body),
  });
}
