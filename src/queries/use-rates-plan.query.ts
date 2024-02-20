import { filter } from '@mcabreradev/filter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RATES } from '@/constants';
import { propertyId } from '@/constants/env';

type Props = {
  checkin: string | null | undefined;
  checkout: string | null | undefined;
  roomTypeId?: number;
};

const fetchRatesPlan = async ({ checkin, checkout }: Props) => {
  const { data } = await axios.get(
    `/api/rates?propertyId=${propertyId}&from=${checkin}&to=${checkout}`,
  );
  return data;
};

export default function useRatesPlanQuery({
  checkin,
  checkout,
  roomTypeId,
}: Props) {
  return useQuery({
    queryKey: [PROPERTY, propertyId, RATES],
    queryFn: () => fetchRatesPlan({ checkin, checkout }),
    select: (data) => (roomTypeId ? filter(data, { roomTypeId }) : data),
  });
}
