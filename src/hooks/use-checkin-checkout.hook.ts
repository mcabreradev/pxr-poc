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

import { CHECKIN_DEFAULT_FUTURE_DAYS, DATE_FORMAT } from '@/constants';
import { useTranslation } from 'react-i18next';

export default function useCheckinCheckoutHook() {
  const { i18n } = useTranslation();
  dayjs.locale(i18n.language);

  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const today = dayjs();
  const checkinDefault = today
    .add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day')
    .format(DATE_FORMAT)
    .toString();
  const checkinParamOrStore = getCheckin();
  const checkin = checkinParamOrStore ?? checkinDefault;

  const checkoutDefault = today
    .add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day')
    .format(DATE_FORMAT)
    .toString();
  const checkoutParamOrStore = getCheckout();
  const checkout = checkoutParamOrStore ?? checkoutDefault;

  return {
    checkin,
    checkinDate: dayjs(checkin).toDate(),
    checkinDayjs: dayjs(checkin),
    checkout,
    checkoutDate: dayjs(checkout).toDate(),
    checkoutDayjs: dayjs(checkout),
  };
}
