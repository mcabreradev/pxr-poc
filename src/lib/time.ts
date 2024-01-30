import dayjs from 'dayjs';

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

export function getMonthDayFormat(date: Date | string) {
  return dayjs(date).format('MMM DD');
}

export function getFormatedMontsDays(
  checkin: Date | string,
  checkout: Date | string,
) {
  return `${getMonthDayFormat(checkin)} - ${getMonthDayFormat(checkout)}`;
}
