/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button';
import Typography from '@/components/typography';

import 'react-datepicker/dist/react-datepicker.css';

import useLocale from '@/hooks/use-locale';
import useQueryString from '@/hooks/use-querystring';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';

import { formatDate, getFormatedMontsDays, reFormatDate } from '@/lib/time';

import useReservationStore from '@/store/use-reservation-persist.store';

import Icon from '@/components/icon';
import {
  CHECKIN,
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  TOTAL_ADULTS_DEFAULT,
  TOTAL_CHILDRENS_DEFAULT,
  TOTAL_INFANTS_DEFAULT,
} from '@/constants';

export default function MobileDatepickerComponent() {
  const { locale } = useLocale();
  const { setReservation, reservation, openDatepickerDrawer } =
    useReservationStore();
  const { updateQueryString } = useQueryString();
  const { getCheckin, getCheckout } = useSearchParamOrStore();
  const { t } = useTranslation();

  const [adults, setAdults] = useState(TOTAL_ADULTS_DEFAULT);
  const [childrens, setChildrens] = useState(TOTAL_CHILDRENS_DEFAULT);
  const [infants, setInfants] = useState(TOTAL_INFANTS_DEFAULT);
  const total = adults + childrens + infants;

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
    <div
      className='relative flex h-full w-full flex-row items-center justify-around bg-white px-2 py-5'
      data-testid='test-element'
    >
      <div className='flex flex-col'>
        <Typography variant='sm' weight='semibold'>
          {t('since')} $100.00 x {t('night.singular')}
        </Typography>
        <Typography
          variant='sm'
          weight='normal'
          className='flex underline'
          onClick={openDatepickerDrawer}
        >
          {`${getFormatedMontsDays(
            checkinDefault,
            checkoutDefault,
          )} • ${total} ${t('person.plural')}`}
        </Typography>

        {/* <DatePicker
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
        /> */}
      </div>
      <div>
        <Button type='button' slim={true}>
          {t('button.choose-room')}
        </Button>
      </div>
    </div>
  );
}
