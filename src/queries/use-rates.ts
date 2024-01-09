import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RATES } from '@/constants';
import { propertyId } from '@/constants/env';

const fetchRates = async ({ checkin, checkout }) => {
  const { data } = await axios.get(
    `/api/rates?propertyId=${propertyId}&from=${checkin}&to=${checkout}`,
  );
  return data;
};

export default function useFetchRates(params) {
  return useQuery({
    queryKey: [PROPERTY, propertyId, RATES],
    queryFn: () => fetchRates(params),
    enabled: false,
  });
}

export function useCacheRates() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([PROPERTY, propertyId, RATES]);
}
