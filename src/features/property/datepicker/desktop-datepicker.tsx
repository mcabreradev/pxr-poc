/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { forwardRef, RefObject, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { useLocale, useQueryString, useSearchParamOrStore } from '@/hooks';
import { formatDateToString, formatStringToDate } from '@/lib/time';
import { cn } from '@/lib/utils';

import { useReservationStore } from '@/store';

import {
  CHECKIN,
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
} from '@/constants';

export default function DatepickerComponent() {
  const { locale } = useLocale();
  const { setReservation } = useReservationStore();
  const { updateQueryString } = useQueryString();
  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const today = dayjs();
  const checkinDefault = today.add(CHECKIN_DEFAULT_FUTURE_DAYS, 'day').toDate();
  const checkin = formatStringToDate(getCheckin());
  const [startDate, setStartDate] = useState<Date | null>(
    checkin ? new Date(checkin) : checkinDefault,
  );

  const checkoutDefault = today
    .add(CHECKOUT_DEFAULT_FUTURE_DAYS, 'day')
    .toDate();
  const checkout = formatStringToDate(getCheckout());
  const [endDate, setEndDate] = useState<Date | null>(
    checkout ? new Date(checkout) : checkoutDefault,
  );

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  useEffect(() => {
    if (!startDate || !endDate) return;
    updateQueryString({
      [CHECKIN]: formatDateToString(startDate),
      [CHECKOUT]: formatDateToString(endDate),
    });
    setReservation({
      checkin: formatDateToString(startDate),
      checkout: formatDateToString(endDate),
    });
  }, [endDate, setReservation, startDate, updateQueryString]);

  const DatePickerInput = forwardRef(
    ({ value, onClick }: { value?: string; onClick?: () => void }, ref) => (
      <input
        type='text'
        name='datepicker'
        value={value}
        onClick={onClick}
        ref={ref as RefObject<HTMLInputElement> | null}
        placeholder='dd/mm/yyyy'
        className={cn(
          'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm placeholder:text-neutral-300 focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
        )}
        onChange={() => null}
      />
    ),
  );

  const DatePickerDay = (day: string) => (
    <span className='flex items-center justify-center'>{day}</span>
  );

  return (
    <div className='relative' data-testid='test-element'>
      <DatePicker
        showPopperArrow={false}
        locale={locale}
        selected={startDate}
        onChange={onChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        monthsShown={2}
        customInput={<DatePickerInput />}
        renderDayContents={DatePickerDay}
        dateFormat='MMM dd'
        minDate={today.toDate()}
        calendarClassName='!flex flex-col md:flex-row gap-0 !font-sans'
        wrapperClassName='w-full'
        selectsRange
        selectsDisabledDaysInRange
        withPortal
        portalId='root-portal'
        disabledKeyboardNavigation
        shouldCloseOnSelect={false}
      />
    </div>
  );
}
