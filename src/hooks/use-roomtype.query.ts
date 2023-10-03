import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { ROOMTYPE } from '@/constant';
import { propertyId } from '@/constant/env';

const fetchRoomType = async (roomtype: string) => {
  const { data } = await axios.get(
    `/api/room-type?propertyId=${propertyId}&roomtype=${roomtype}`,
  );
  return data;
};

export default function useRoomTypeQuery(roomtype: string) {
  return useQuery({
    queryKey: [ROOMTYPE, roomtype],
    queryFn: () => fetchRoomType(roomtype),
  });
}

export function useRoomTypeCache(roomtype: string) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([ROOMTYPE, roomtype]);
}
