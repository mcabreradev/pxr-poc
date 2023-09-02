import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY } from '@/constant';

const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;

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
