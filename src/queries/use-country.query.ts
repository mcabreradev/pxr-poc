import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { COUNTRY } from '@/constants';

const fetchCountry = async () => {
  const { data } = await axios.get(`/api/country`);
  return data;
};

export default function useCountryQuery() {
  return useQuery({
    queryKey: [COUNTRY],
    queryFn: () => fetchCountry(),
  });
}
