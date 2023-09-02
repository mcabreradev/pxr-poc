import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { ROOMTYPES } from '@/constant';

const propertyId = process.env.NEXT_PUBLIC_PAXER_HOTEL_ID;

const fetchRoomTypes = async () => {
  const { data } = await axios.get(`/api/room-types?propertyId=${propertyId}`);
  return data;
};

export default function useRoomTypesQuery() {
  return useQuery({
    queryKey: [ROOMTYPES, propertyId],
    queryFn: () => fetchRoomTypes(),
  });
}

export function useCacheRoomTypes() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([ROOMTYPES, propertyId]);
}
