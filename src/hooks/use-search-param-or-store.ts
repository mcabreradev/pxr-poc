import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { getCheckinDefault, getCheckoutDefault } from '@/lib/time';

import useReservationStore from '@/store/use-reservation.store';

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

import { Reservation } from '@/types';

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
    () => getByQueryParamOrStoreItem(CHECKIN, CHECKIN) || getCheckinDefault(),
    [getByQueryParamOrStoreItem],
  );

  const getCheckout = useCallback(
    () =>
      getByQueryParamOrStoreItem(CHECKOUT, CHECKOUT) || getCheckoutDefault(),
    [getByQueryParamOrStoreItem],
  );

  const getAdults = useCallback(
    () =>
      Number(
        getByQueryParamOrStoreItem(TOTAL_ADULTS, ADULTS) ||
          TOTAL_ADULTS_DEFAULT,
      ),
    [getByQueryParamOrStoreItem],
  );

  const getChildrens = useCallback(
    () =>
      Number(getByQueryParamOrStoreItem(TOTAL_CHILDRENS, CHILDRENS) || null),
    [getByQueryParamOrStoreItem],
  );

  const getInfants = useCallback(
    () => Number(getByQueryParamOrStoreItem(TOTAL_INFANTS, INFANTS) || null),
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

  /**
   * Retrieves a value by querying the search parameter or store item.
   *
   * @param q - The query string.
   * @param s - The key of the store item.
   * @returns The value retrieved from the search parameter or store item.
   */
  const get = useCallback(
    (q: string, s: keyof Reservation) => getByQueryParamOrStoreItem(q, s),
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
    get,
  };
};

export default useSearchParamOrStore;
