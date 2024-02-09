/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import useLocale from '@/hooks/use-locale';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import { formatDate, getFormatedMontsDays } from '@/lib/time';

import Button from '@/components/button';
import Drawer from '@/components/drawer';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import useGlobalStore from '@/store/use-global.store';
import useReservationStore from '@/store/use-reservation-persist.store';

import {
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  TOTAL_ADULTS_DEFAULT,
  TOTAL_CHILDRENS_DEFAULT,
  TOTAL_INFANTS_DEFAULT,
} from '@/constants';
import useQueryString from '@/hooks/use-querystring';
import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';
import { useTranslation } from 'react-i18next';

export default function DrawerDatepickerComponent() {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const { setReservation } = useReservationStore();
  const { getCheckin, getCheckout } = useSearchParamOrStore();
  const { updateQueryString } = useQueryString();
  const { closeDatepickerDrawer } = useGlobalStore();

  const [step, setStep] = useState(1);

  // Calendar
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

  const resetHandler = useCallback(() => {
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
    // updateQueryString({
    //   [CHECKIN]: reFormatDate(startDate),
    //   [CHECKOUT]: reFormatDate(endDate),
    // });
    // setReservation({
    //   checkin: reFormatDate(startDate),
    //   checkout: reFormatDate(endDate),
    // });
  }, [endDate, setReservation, startDate, updateQueryString]);

  useEffect(() => {
    const unsub = useGlobalStore.subscribe(({ isOpenDatepickerDrawer }) => {
      setOpenDatepickerDrawer(isOpenDatepickerDrawer || false);
    });

    return unsub;
  }, []);

  const planDays = dayjs(endDate).diff(dayjs(startDate), 'days');
  const dayMonthYear =
    startDate && endDate
      ? getFormatedMontsDays(startDate, endDate, 'DD MMM. YYYY')
      : null;

  // Select Guests
  const [adults, setAdults] = useState(TOTAL_ADULTS_DEFAULT);
  const [childrens, setChildrens] = useState(TOTAL_CHILDRENS_DEFAULT);
  const [infants, setInfants] = useState(TOTAL_INFANTS_DEFAULT);

  const { getAdults, getChildrens, getInfants } = useSearchParamOrStore();
  const {
    selectedRoom,
    selectedRoom: { minCapacity, maxCapacity, childCapacity },
  } = useSelectedRoomtypeStore();

  useEffect(() => {
    setAdults(getAdults() || minCapacity || TOTAL_ADULTS_DEFAULT);
    setChildrens(getChildrens() || TOTAL_CHILDRENS_DEFAULT);
    setInfants(getInfants() || TOTAL_INFANTS_DEFAULT);
  }, [getAdults, getChildrens, getInfants, minCapacity, selectedRoom]);

  const totalGuests = adults + childrens + infants;
  const isMaxCapacityReached = totalGuests >= (maxCapacity ?? 0);
  const adultsBlockedCondition = isMaxCapacityReached;
  const childrensBlockedCondition = !childCapacity && isMaxCapacityReached;
  const infantsBlockedCondition = !childCapacity && isMaxCapacityReached;

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

  const Calendar = () => (
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

  const StepOne = () => (
    <div className='flex h-screen flex-col '>
      <div className='m-4 flex-none'>
        <Typography variant='h1'>
          {planDays
            ? `${planDays} ${t('night.plural')}`
            : t('info.select-date')}
        </Typography>

        <Typography
          variant='sm2'
          weight='medium'
          className='lowercase text-neutral-400'
        >
          {dayMonthYear ? dayMonthYear : t('info.select-date')}
        </Typography>
      </div>

      <div className='flex flex-1 items-center justify-center'>
        <Calendar />
      </div>

      <div className='m-4 flex flex-none justify-between'>
        <Button type='button' variant='text' slim={true} onClick={resetHandler}>
          Borrar
        </Button>
        <Button type='button' variant='primary' onClick={() => setStep(2)}>
          Siguiente
        </Button>
      </div>
    </div>
  );

  const StepTwo = () => (
    <div className='mb-4 flex h-screen flex-col'>
      <div className='m-4 flex-none'>
        <Typography variant='h1'>Cuantos vienen?</Typography>
        <Typography
          variant='sm2'
          weight='medium'
          className='lowercase text-neutral-400'
        >
          4
        </Typography>
      </div>

      <div className='flex-1'></div>

      <div className='mt-2 flex flex-none justify-between'>
        <Button
          type='link'
          variant='text'
          slim={true}
          onClick={() => setStep(1)}
        >
          Atras
        </Button>
        <Button type='button' variant='primary' onClick={() => null}>
          Guardar
        </Button>
      </div>
    </div>
  );

  return (
    <Drawer
      icon='cancel'
      open={isOpenDatepickerDrawer}
      onClose={closeDatepickerDrawer}
    >
      <>
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
      </>
    </Drawer>
  );
}
