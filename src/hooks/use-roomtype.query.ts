import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { ROOMTYPE } from '@/constant';
import { propertyId } from '@/constant/env';

const fetchRoomType = async (roomTypeId: string) => {
  const { data } = await axios.get(
    `/api/room-type?propertyId=${propertyId}&roomTypeId=${roomTypeId}`,
  );
  return data;
};

export default function useRoomTypeQuery(roomTypeId: string) {
  return useQuery({
    queryKey: [ROOMTYPE, roomTypeId],
    queryFn: () => fetchRoomType(roomTypeId),
  });
}

export function useRoomTypeCache(roomTypeId: string) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData([ROOMTYPE, roomTypeId]);
}
