import filter from '@mcabreradev/filter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, PROPERTY_CURRENCY, RATES } from '@/constants';
import { propertyId } from '@/constants/env';

type Props = {
  checkin: string | null | undefined;
  checkout: string | null | undefined;
  roomTypeId?: number;
};

export const fetchRatesPlan = async ({ checkin, checkout }: Props) => {
  const { data } = await axios.get(
    `/api/rates?propertyId=${propertyId}&from=${checkin}&to=${checkout}`,
  );
  return data;
};

export default function useRatesPlanQuery({
  checkin,
  checkout,
  roomTypeId: _roomTypeId,
}: Props) {
  const predicade = ({ roomTypeId, currency, reservationPolicies }) =>
    roomTypeId === Number(_roomTypeId) &&
    currency === PROPERTY_CURRENCY &&
    reservationPolicies;

  return useQuery({
    queryKey: [PROPERTY, propertyId, RATES],
    queryFn: () => fetchRatesPlan({ checkin, checkout }),
    select: (data) => (_roomTypeId ? filter(data, predicade) : data),
    retry: false,
  });
}
