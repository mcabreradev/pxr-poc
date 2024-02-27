/**
 * Custom hook that handles the check-in and check-out dates for a booking.
 * It retrieves the check-in and check-out dates from the search parameters or store,
 * and provides formatted versions of these dates for display and manipulation.
 *
 * @returns An object containing the check-in and check-out dates, as well as their formatted versions.
 */
/* eslint-disable simple-import-sort/imports */

import dayjs from 'dayjs';
import { useMemo } from 'react';

import { useSearchParamOrStore } from '@/hooks';
import { formatDateToString, formatStringToDate } from '@/lib/time';

import { CHECKIN_DEFAULT_FUTURE_DAYS } from '@/constants';

export default function useCheckinCheckoutHook() {
  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const today = dayjs();
  const checkinDefault = today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toDate();
  const checkinParamOrStore = formatStringToDate(getCheckin());

  const checkin = useMemo(
    () =>
      formatDateToString(
        checkinParamOrStore ? new Date(checkinParamOrStore) : checkinDefault,
      ),
    [checkinDefault, checkinParamOrStore],
  );

  const checkoutDefault = today
    .add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day')
    .toDate();
  const checkoutParamOrStore = formatStringToDate(getCheckout());

  const checkout = useMemo(
    () =>
      formatDateToString(
        checkoutParamOrStore ? new Date(checkoutParamOrStore) : checkoutDefault,
      ),
    [checkoutDefault, checkoutParamOrStore],
  );

  return {
    checkin,
    checkinDate: formatStringToDate(checkin),
    checkout,
    checkoutDate: formatStringToDate(checkout),
  };
}
