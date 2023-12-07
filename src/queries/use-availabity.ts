import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { AVAILABILITY, PROPERTY } from '@/constants';
import { propertyId } from '@/constants/env';

const fetchAvailability = async ({ checkin, checkout }) => {
  const { data } = await axios.get(
    `/api/availability?propertyId=${propertyId}&from=${checkin}&to=${checkout}`,
  );
  return data;
};

export default function useFetchAvailability(params) {
  return useQuery({
    queryKey: [PROPERTY, propertyId, AVAILABILITY],
    queryFn: () => fetchAvailability(params),
    enabled: false,
  });
}

export function useCacheAvailability() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([PROPERTY, propertyId, AVAILABILITY]);
}
