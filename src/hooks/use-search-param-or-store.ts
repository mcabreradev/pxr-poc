import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import useReservationStore, {
  Reservation,
} from '@/store/use-reservation-persist.store';

import {
  ADULTS,
  CHECKIN,
  CHECKOUT,
  CHILDRENS,
  EXTRA,
  INFANTS,
  PLAN,
  TOTAL_ADULTS,
  TOTAL_ADULTS_DEFAULT,
  TOTAL_CHILDRENS,
  TOTAL_INFANTS,
} from '@/constants';

const useSearchParamOrStore = () => {
  const searchParams = useSearchParams();
  const { getReservationBy } = useReservationStore();

  const getByQueryParamOrStoreItem = useCallback(
    (p: string, s: keyof Reservation) => {
      const queryParam = searchParams.get(p);
      const storeItem = getReservationBy(s);

      return queryParam || storeItem;
    },
    [getReservationBy, searchParams],
  );

  const getCheckin = useCallback(
    () => getByQueryParamOrStoreItem(CHECKIN, CHECKIN) || undefined,
    [getByQueryParamOrStoreItem],
  );
  const getCheckout = useCallback(
    () => getByQueryParamOrStoreItem(CHECKOUT, CHECKOUT) || undefined,
    [getByQueryParamOrStoreItem],
  );
  const getAdults = useCallback(
    () =>
      getByQueryParamOrStoreItem(TOTAL_ADULTS, ADULTS) || TOTAL_ADULTS_DEFAULT,
    [getByQueryParamOrStoreItem],
  );
  const getChildrens = useCallback(
    () => getByQueryParamOrStoreItem(TOTAL_CHILDRENS, CHILDRENS) || null,
    [getByQueryParamOrStoreItem],
  );
  const getInfants = useCallback(
    () => getByQueryParamOrStoreItem(TOTAL_INFANTS, INFANTS) || null,
    [getByQueryParamOrStoreItem],
  );
  const getPlan = useCallback(
    () => getByQueryParamOrStoreItem(PLAN, PLAN),
    [getByQueryParamOrStoreItem],
  );
  const getExtra = useCallback(
    () => getByQueryParamOrStoreItem(EXTRA, EXTRA),
    [getByQueryParamOrStoreItem],
  );

  return {
    getCheckin,
    checkin: getCheckin(),
    getCheckout,
    checkout: getCheckout(),
    getAdults,
    adults: getAdults(),
    getChildrens,
    childrens: getChildrens(),
    getInfants,
    infants: getInfants(),
    getPlan,
    plan: getPlan(),
    getExtra,
    extra: getExtra(),
  };
};

export default useSearchParamOrStore;
