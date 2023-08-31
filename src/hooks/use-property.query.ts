import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY } from '@/constant';

const propertyId = process.env.NEXT_PUBLIC_PAXER_HOTEL_ID;

const queryKey = [PROPERTY, propertyId];

const fetchProperty = async () => {
  const { data } = await axios.get(`/api/property?propertyId=${propertyId}`);
  return data;
};

export default function useFetchProperty() {
  return useQuery({
    queryKey,
    queryFn: () => fetchProperty(),
  });
}

export function useCacheProperty() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(queryKey);
}
