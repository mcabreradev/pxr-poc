import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { ROOMTYPES } from '@/constant';

const propertyId = process.env.NEXT_PUBLIC_PAXER_HOTEL_ID;

const queryKey = [ROOMTYPES, propertyId];

const fetchRoomTypes = async () => {
  const { data } = await axios.get(`/api/room-types?propertyId=${propertyId}`);
  return data;
};

export default function useRoomTypesQuery() {
  return useQuery({
    queryKey,
    queryFn: () => fetchRoomTypes(),
  });
}

export function useCacheRoomTypes() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(queryKey);
}
