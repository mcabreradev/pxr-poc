import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { processImages } from '@/lib/images';

import { PROPERTY } from '@/constants';
import { propertyId } from '@/constants/env';

export const fetchProperty = async () => {
  const { data } = await axios.get(`/api/property?propertyId=${propertyId}`);
  return data;
};

export default function usePropertyQuery() {
  return useQuery({
    queryKey: [PROPERTY, propertyId],
    queryFn: () => fetchProperty(),
    select: processImages,
  });
}

export function useCacheProperty() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([PROPERTY, propertyId]);
}
