import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { ROOMTYPE } from '@/constants';
import { propertyId } from '@/constants/env';

const fetchRoomType = async (roomtype: string | number | null) => {
  const { data } = await axios.get(
    `/api/room-type?propertyId=${propertyId}&roomtype=${roomtype}`,
  );
  return data;
};

export default function useRoomTypeQuery(roomtype: string | number | null) {
  return useQuery({
    queryKey: [ROOMTYPE, roomtype],
    queryFn: () => fetchRoomType(roomtype),
  });
}

export function useRoomTypeCache(roomtype: string) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([ROOMTYPE, roomtype]);
}
