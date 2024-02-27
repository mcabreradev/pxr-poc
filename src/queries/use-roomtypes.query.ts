import filter from '@mcabreradev/filter';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, PROPERTY_CURRENCY, RATES, ROOMTYPES } from '@/constants';
import { propertyId } from '@/constants/env';
import { fetchRatesPlan } from '@/queries/use-rates-plan.query';

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

export function useRoomTypeWithRatesPlansQuery({ checkin, checkout }) {
  const predicade = ({ currency, reservationPolicies }) =>
    currency === PROPERTY_CURRENCY && reservationPolicies;

  return useQueries({
    queries: [
      { queryKey: [ROOMTYPES, propertyId], queryFn: () => fetchRoomTypes() },
      {
        queryKey: [PROPERTY, propertyId, RATES],
        queryFn: () => fetchRatesPlan({ checkin, checkout }),
        select: (data) => filter(data, predicade),
        retry: 3,
      },
    ],
    combine: (results) => {
      return {
        data: results.map(({ data }) => data),
        loading: results.some(({ isLoading }) => isLoading),
        pending: results.some(({ isPending }) => isPending),
        error: results.some(({ isError }) => isError),
      };
    },
  });
}
