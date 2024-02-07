/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import useLocale from '@/hooks/use-locale';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import { formatDate, reFormatDate } from '@/lib/time';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

import useDrawerStore from '@/store/use-drawer.store';
import useReservationStore from '@/store/use-reservation-persist.store';

import {
  CHECKIN,
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
} from '@/constants';
import useQueryString from '@/hooks/use-querystring';

export default function MobileDatepicker() {
  const { locale } = useLocale();
  const { setReservation } = useReservationStore();
  const { getCheckin, getCheckout } = useSearchParamOrStore();
  const { updateQueryString } = useQueryString();
  const { closeDatepickerDrawer } = useDrawerStore();

  const [step, setStep] = useState(1);

  const today = dayjs();
  const checkinDefault = today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toDate();
  const checkin = formatDate(getCheckin());
  const [startDate, setStartDate] = useState<Date | null>(
    checkin ? new Date(checkin) : checkinDefault,
  );

  const checkoutDefault = today
    .add(CHECKOUT_DEFAULT_FUTURE_DAYS, 'day')
    .toDate();
  const checkout = formatDate(getCheckout());
  const [endDate, setEndDate] = useState<Date | null>(
    checkout ? new Date(checkout) : checkoutDefault,
  );

  const [isOpenDatepickerDrawer, setOpenDatepickerDrawer] = useState(false);

  const onChange = useCallback((dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }, []);

  const onReset = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => e.stopPropagation(),
    [],
  );

  const handleCalendarOpen = useCallback(() => {
    document.addEventListener('touchstart', handleTouchStart, true);
    const datepickerDays = document.getElementsByClassName(
      'react-datepicker__day',
    );
    const element = datepickerDays[0] as HTMLElement;
    if (element) element.focus();
  }, [handleTouchStart]);

  const handleCalendarClose = () => {
    document.removeEventListener('touchstart', handleTouchStart, true);
  };

  useEffect(() => {
    if (!startDate || !endDate) return;
    updateQueryString({
      [CHECKIN]: reFormatDate(startDate),
      [CHECKOUT]: reFormatDate(endDate),
    });
    setReservation({
      checkin: reFormatDate(startDate),
      checkout: reFormatDate(endDate),
    });
  }, [endDate, setReservation, startDate, updateQueryString]);

  useEffect(() => {
    const unsub = useDrawerStore.subscribe(({ isOpenDatepickerDrawer }) => {
      setOpenDatepickerDrawer(isOpenDatepickerDrawer || false);
    });

    return unsub;
  }, []);

  const DayPickerText = ({
    value,
    onClick,
  }: {
    value?: string;
    onClick?: () => void;
  }) => (
    <Typography
      variant='sm'
      weight='normal'
      className='flex underline'
      onClick={onClick}
    >
      {value}
      <Icon variant='dot' width={20} height={20} color='#000' />
    </Typography>
  );

  const DatePickerDay = (day: string) => (
    <span className='flex items-center justify-center'>{`${day}`}</span>
  );

  return (
    <DatePicker
      onCalendarOpen={handleCalendarOpen}
      onCalendarClose={handleCalendarClose}
      showPopperArrow={false}
      locale={locale}
      selected={startDate}
      onChange={onChange}
      selectsStart
      startDate={startDate}
      endDate={endDate}
      monthsShown={2}
      customInput={<DayPickerText />}
      renderDayContents={DatePickerDay}
      dateFormat='MMM dd'
      minDate={today.toDate()}
      calendarClassName='!flex flex-col md:flex-row gap-0 !font-sans'
      wrapperClassName='w-full'
      selectsRange
      selectsDisabledDaysInRange
      disabledKeyboardNavigation
      shouldCloseOnSelect={false}
      inline
    />
  );
}
