import dayjs from 'dayjs';

import {
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
} from '@/constants';

const today = dayjs();

export function formatDate(date) {
  if (!date) return '';

  const d = date.split('-');
  const day = d[1];
  const month = d[2];
  const year = d[0];
  return [day, month, year].join('-');
}

export function reFormatDate(date: Date | string) {
  const d = new Date(date?.toString());
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
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
  return today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toString();
}

export function getCheckoutDefault() {
  return today.add(CHECKOUT_DEFAULT_FUTURE_DAYS, 'day').toString();
}
