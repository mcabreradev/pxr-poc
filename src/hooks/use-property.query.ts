import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProperty = async (id: string) => {
  const { data } = await axios.get('/api/property?id=' + id);
  return data;
};

export default function usePropertyQuery(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id),
  });
}
