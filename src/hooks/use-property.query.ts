import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY } from '@/constant';
import { propertyId } from '@/constant/env';

const fetchProperty = async () => {
  const { data } = await axios.get(`/api/property?propertyId=${propertyId}`);
  return data;
};

export default function useFetchProperty() {
  return useQuery({
    queryKey: [PROPERTY, propertyId],
    queryFn: () => fetchProperty(),
  });
}

export function useCacheProperty() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([PROPERTY, propertyId]);
}
