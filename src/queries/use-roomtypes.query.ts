import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PROPERTY, RATES, ROOMTYPES } from '@/constants';
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
  // change when CLP is present
  // const predicade = ({ currency, reservationPolicies }) =>
  //   currency === PROPERTY_CURRENCY && reservationPolicies;

  const predicade = ({ reservationPolicies }) => reservationPolicies;

  return useQueries({
    queries: [
      { queryKey: [ROOMTYPES, propertyId], queryFn: () => fetchRoomTypes() },
      {
        queryKey: [PROPERTY, propertyId, RATES],
        queryFn: () => fetchRatesPlan({ checkin, checkout }),
        select: (data) =>
          data.filter(predicade).map((plan) => {
            const productDates = Object.keys(plan.productDates).map(
              (date) => plan?.productDates[date],
            );
            return {
              ...productDates[0].rates[1],
              ...plan,
            };
          }),
        retry: false,
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
