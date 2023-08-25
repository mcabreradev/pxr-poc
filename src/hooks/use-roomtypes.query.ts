import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRoomTypes = async (id: string) => {
  const { data } = await axios.get(`/api/roomtypes?propertyId=${id}`);
  return data;
};

export default function useRoomTypesQuery(id: string) {
  return useQuery({
    queryKey: ['room-types', id],
    queryFn: () => fetchRoomTypes(id),
  });
}
