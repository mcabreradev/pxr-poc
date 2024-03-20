import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { processImages } from '@/lib/images';

import { ROOMTYPE } from '@/constants';
import { propertyId } from '@/constants/env';

const fetchRoomType = async (roomTypeId: number | number | null) => {
  const { data } = await axios.get(
    `/api/room-type?propertyId=${propertyId}&roomTypeId=${roomTypeId}`,
  );
  return data;
};

export default function useRoomTypeQuery(roomTypeId: number | number | null) {
  return useQuery({
    queryKey: [ROOMTYPE, roomTypeId],
    queryFn: () => fetchRoomType(roomTypeId),
    select: processImages,
  });
}
