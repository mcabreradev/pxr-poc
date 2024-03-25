/**
 * Custom hook that retrieves values from search parameters or a store.
 */
import dayjs from 'dayjs';
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

/**
 * Custom hook that retrieves values from search parameters or a store.
 */
const useSearchParamOrStore = () => {
  const searchParams = useSearchParams();
  const { getReservationBy } = useReservationStore();

  /**
   * Retrieves a value by querying the search parameter or store item.
   *
   * @param p - The query string.
   * @param s - The key of the store item.
   * @returns The value retrieved from the search parameter or store item.
   */
  const getByQueryParamOrStoreItem = useCallback(
    (p: string, s: keyof Reservation) => {
      const queryParam = searchParams.get(p);
      const storeItem = getReservationBy(s);

      return queryParam || storeItem;
    },
    [getReservationBy, searchParams],
  );

  /**
   * Retrieves the check-in date from the search parameter or store item.
   *
   * @returns The check-in date.
   */
  const getCheckin = useCallback(
    () => getByQueryParamOrStoreItem(CHECKIN, CHECKIN) || getCheckinDefault(),
    [getByQueryParamOrStoreItem],
  );

  /**
   * Retrieves the check-out date from the search parameter or store item.
   *
   * @returns The check-out date.
   */
  const getCheckout = useCallback(
    () =>
      getByQueryParamOrStoreItem(CHECKOUT, CHECKOUT) || getCheckoutDefault(),
    [getByQueryParamOrStoreItem],
  );

  /**
   * Retrieves the number of adults from the search parameter or store item.
   *
   * @returns The number of adults.
   */
  const getAdults = useCallback(
    () =>
      Number(
        getByQueryParamOrStoreItem(TOTAL_ADULTS, ADULTS) ||
          TOTAL_ADULTS_DEFAULT,
      ),
    [getByQueryParamOrStoreItem],
  );

  /**
   * Retrieves the number of children from the search parameter or store item.
   *
   * @returns The number of children.
   */
  const getChildrens = useCallback(
    () =>
      Number(getByQueryParamOrStoreItem(TOTAL_CHILDRENS, CHILDRENS) || null),
    [getByQueryParamOrStoreItem],
  );

  /**
   * Retrieves the number of infants from the search parameter or store item.
   *
   * @returns The number of infants.
   */
  const getInfants = useCallback(
    () => Number(getByQueryParamOrStoreItem(TOTAL_INFANTS, INFANTS) || null),
    [getByQueryParamOrStoreItem],
  );

  /**
   * Retrieves the plan from the search parameter or store item.
   *
   * @returns The plan.
   */
  const getPlan = useCallback(
    () => getByQueryParamOrStoreItem(PLAN, PLAN),
    [getByQueryParamOrStoreItem],
  );

  /**
   * Retrieves the extra from the search parameter or store item.
   *
   * @returns The extra.
   */
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
  const getPoS = useCallback(
    (q: string, s: keyof Reservation) => getByQueryParamOrStoreItem(q, s),
    [getByQueryParamOrStoreItem],
  );

  return {
    getCheckin,
    checkin: getCheckin(),
    checkinFormated: dayjs(getCheckin()).format('YYYY-MM-DD'),
    checkinDayjs: dayjs(getCheckin()),
    checkinDate: dayjs(getCheckin()).toDate(),
    getCheckout,
    checkout: getCheckout(),
    checkoutFormated: dayjs(getCheckout()).format('YYYY-MM-DD'),
    checkoutDayjs: dayjs(getCheckout()),
    checkoutDate: dayjs(getCheckout()).toDate(),
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
    getPoS,
  };
};

export default useSearchParamOrStore;
