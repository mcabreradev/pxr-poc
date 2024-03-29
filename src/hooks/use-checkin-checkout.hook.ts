/**
 * Custom hook that handles the check-in and check-out dates for a booking.
 * It retrieves the check-in and check-out dates from the search parameters or store,
 * and provides formatted versions of these dates for display and manipulation.
 *
 * @returns An object containing the check-in and check-out dates, as well as their formatted versions.
 */
/* eslint-disable simple-import-sort/imports */

import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';

import { useSearchParamOrStore } from '@/hooks';
import { formatDateToString, formatStringToDate } from '@/lib/time';

import { CHECKIN_DEFAULT_FUTURE_DAYS } from '@/constants';
import { useTranslation } from 'react-i18next';

export default function useCheckinCheckoutHook() {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language);

  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const today = dayjs();
  const checkinDefault = today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toDate();
  const checkinParamOrStore = formatStringToDate(getCheckin());

  const checkin = formatDateToString(
    checkinParamOrStore ? new Date(checkinParamOrStore) : checkinDefault,
  );

  const checkoutDefault = today
    .add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day')
    .toDate();
  const checkoutParamOrStore = formatStringToDate(getCheckout());

  const checkout = formatDateToString(
    checkoutParamOrStore ? new Date(checkoutParamOrStore) : checkoutDefault,
  );

  return {
    checkin,
    checkinDate: formatStringToDate(checkin),
    checkinDayjs: dayjs(checkin),
    checkout,
    checkoutDate: formatStringToDate(checkout),
    checkoutDayjs: dayjs(checkout),
  };
}
