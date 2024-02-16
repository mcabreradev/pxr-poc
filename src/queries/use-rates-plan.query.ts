import filter from '@mcabreradev/filter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RATES } from '@/constants';
import { propertyId } from '@/constants/env';

const fetchRatesPlan = async ({ checkin, checkout }) => {
  const { data } = await axios.get(
    `/api/rates?propertyId=${propertyId}&from=${checkin}&to=${checkout}`,
  );
  return data;
};

export default function useRatesPlanQuery(params) {
  return useQuery({
    queryKey: [PROPERTY, propertyId, RATES],
    queryFn: () => fetchRatesPlan(params),
    enabled: false,
  });
}

export function useRatePlanByRoomtypeIdQuery({
  roomTypeId,
  checkin,
  checkout,
}) {
  return useQuery({
    queryKey: [PROPERTY, propertyId, RATES],
    queryFn: () => fetchRatesPlan({ checkin, checkout }),
    select: (data) => filter(data, { roomTypeId }),
  });
}
