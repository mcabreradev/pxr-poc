import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProperty = async (hotid: string) => {
  const { data } = await axios.get('/api/property?hotid=' + hotid);
  return data;
};

export default function useQueryProperty(hotid: string) {
  return useQuery({
    queryKey: ['queryProperty', hotid],
    queryFn: () => fetchProperty(hotid),
  });
}
