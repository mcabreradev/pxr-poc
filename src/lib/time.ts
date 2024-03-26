import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/es';

import {
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  DEFAULT_LANG,
  NEXT_LOCALE,
} from '@/constants';

const locale = localStorage.getItem(NEXT_LOCALE) || DEFAULT_LANG;
dayjs.locale(locale);
const today = dayjs();

export function formatStringToDate(date: string) {
  if (!date) return '';

  const d = date.split('-');
  const day = d[1];
  const month = d[2];
  const year = d[0];
  return [day, month, year].join('-');
}

export function formatDateToString(date: Date) {
  let d = new Date(date);
  if (isNaN(d.getTime())) {
    d = new Date();
  }

  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const year = d.getFullYear();

  return `${year}-${month}-${day}`;
}

export function getMonthDayFormat(
  date: Date | string,
  format: string = 'MMM DD',
) {
  return dayjs(date).format(format);
}

export function getFormatedMontsDays(
  checkin: Date,
  checkout: Date,
  format: string = 'MMM DD',
) {
  return `${getMonthDayFormat(checkin, format)} - ${getMonthDayFormat(
    checkout,
    format,
  )}`;
}

export function getCheckinDefault() {
  return today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').format('YYYY-MM-DD');
}

export function getCheckoutDefault() {
  return today.add(CHECKOUT_DEFAULT_FUTURE_DAYS, 'day').format('YYYY-MM-DD');
}
