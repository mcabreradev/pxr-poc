import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { INVENTORY, PROPERTY } from '@/constants';
import { propertyId } from '@/constants/env';

const fetchInventory = async ({ checkin, checkout }) => {
  const { data } = await axios.get(
    `/api/inventory?propertyId=${propertyId}&from=${checkin}&to=${checkout}`,
  );
  return data;
};

export default function useFetchInventory(params) {
  return useQuery({
    queryKey: [PROPERTY, propertyId, INVENTORY],
    queryFn: () => fetchInventory(params),
  });
}

export function useCacheInventory() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([PROPERTY, propertyId, INVENTORY]);
}
