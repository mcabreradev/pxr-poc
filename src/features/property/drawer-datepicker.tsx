/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import useLocale from '@/hooks/use-locale';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import { formatDate, reFormatDate } from '@/lib/time';

import Button from '@/components/button';
import Drawer from '@/components/drawer';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import useReservationStore from '@/store/use-reservation-persist.store';

import {
  CHECKIN,
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
} from '@/constants';
import useQueryString from '@/hooks/use-querystring';

export default function DrawerDatepickerComponent() {
  const { locale } = useLocale();
  const {
    reservation,
    reservation: { isOpenDatepickerDrawer },
    closeDatepickerDrawer,
    setReservation,
  } = useReservationStore();
  const { getCheckin, getCheckout } = useSearchParamOrStore();
  const { updateQueryString } = useQueryString();

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

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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
    <Drawer
      icon='cancel'
      open={isOpenDatepickerDrawer}
      onClose={closeDatepickerDrawer}
    >
      <>
        <h1>Escoje tu fecha</h1>
        <DatePicker
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
          withPortal
          portalId='root-portal'
          disabledKeyboardNavigation
          shouldCloseOnSelect={false}
          inline
        />
        <div className='mt-2 flex justify-between'>
          <Button type='link' variant='text' slim={true}>
            Borrar
          </Button>
          <Button type='button' variant='primary' className=''>
            Siguiente
          </Button>
        </div>
      </>
    </Drawer>
  );
}
