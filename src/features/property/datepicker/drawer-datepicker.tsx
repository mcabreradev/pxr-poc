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
import { cn, ps } from '@/lib/utils';
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
  const [show, setShow] = useState<string | null>(null);

  const setShowHandler = useCallback((view) => setShow(view), []);

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
  const isMaxCapacityReached = false; //totalGuests >= (maxCapacity ?? 0);
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
      <div className='m-2 my-4 flex-none'>
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

      <div className='flex-1 items-center justify-center'>
        {show === 'calendar' && (
          <div className='rounded-[24px] border-solid border-white bg-white drop-shadow-xl'>
            <Calendar />
          </div>
        )}

        {!show && (
          <Typography
            className='my-4 flex flex-row justify-between justify-self-start rounded-[16px] border-solid border-white bg-white px-4 py-5 drop-shadow'
            onClick={() => setShowHandler('calendar')}
          >
            <Typography
              variant='sm'
              className='text-neutral-400'
              weight='semibold'
            >
              {t('button.date.plural')}
            </Typography>
            <Typography
              variant='sm'
              className='text-neutral-500'
              weight='semibold'
            >
              {t('button.add-date.plural')}
            </Typography>
          </Typography>
        )}

        {!show && (
          <Typography className='my-4 flex flex-row justify-between justify-self-start rounded-[16px] border-solid border-white bg-white px-4 py-5 drop-shadow'>
            <Typography
              variant='sm'
              className='text-neutral-400'
              weight='semibold'
            >
              {t('button.guest.plural')}
            </Typography>
            <Typography
              variant='sm'
              className='text-neutral-500'
              weight='semibold'
            >
              {t('button.add-guest.plural')}
            </Typography>
          </Typography>
        )}
      </div>

      <div className='m-4 flex flex-none justify-between'>
        <span>
          {!!planDays && (
            <Button
              type='button'
              variant='text'
              slim={true}
              onClick={resetHandler}
            >
              Reestableecer
            </Button>
          )}

          {!planDays && (
            <Button
              type='button'
              variant='text'
              slim={true}
              onClick={() => setShowHandler(null)}
            >
              Omitir
            </Button>
          )}
        </span>

        <Button type='button' variant='primary' onClick={() => setStep(2)}>
          Siguiente
        </Button>
      </div>
    </div>
  );

  const GuestsData = () => (
    <div className='right-0 w-full origin-top-right bg-white text-black  outline-none'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col items-start'>
          <Typography variant='sm'>{t('adult.plural')}</Typography>
          <Typography variant='sm' className='text-neutral-300'>
            {t('info.13years-or-more')}
          </Typography>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Icon
            variant='minus'
            width={20}
            color={adults === 1 ? '#d5d3d3' : '#797979'}
            className={cn(
              adults === 1 ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={() => {
              if (adults === 1) return;
              setAdults(adults - 1);
            }}
          />
          <Typography variant='sm' className='w-6 text-center'>
            {adults}
          </Typography>
          <Icon
            variant='plus'
            width={20}
            color={adultsBlockedCondition ? '#d5d3d3' : '#797979'}
            className={cn(
              adultsBlockedCondition ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={() => {
              if (adultsBlockedCondition) return;
              setAdults(adults + 1);
            }}
          />
        </div>
      </div>
      <div className='flex items-center justify-between py-3'>
        <div className='flex flex-col items-start'>
          <Typography variant='sm'>{t('children.plural')}</Typography>
          <Typography variant='sm' className='text-neutral-300'>
            {t('info.2to12')}
          </Typography>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Icon
            variant='minus'
            width={20}
            color={childrens === 0 ? '#d5d3d3' : '#797979'}
            className={cn(
              childrens === 0 ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={() => {
              if (childrens === 0) return;
              setInfants(childrens - 1);
            }}
          />
          <Typography variant='sm' className='w-6 text-center'>
            {childrens}
          </Typography>
          <Icon
            variant='plus'
            width={20}
            color={childrensBlockedCondition ? '#d5d3d3' : '#797979'}
            className={cn(
              childrensBlockedCondition
                ? 'cursor-not-allowed'
                : 'cursor-pointer',
            )}
            onClick={() => {
              if (childrensBlockedCondition) return;
              setChildrens(childrens + 1);
            }}
          />
        </div>
      </div>
      <div className='flex items-center justify-between pb-3'>
        <div className='flex flex-col items-start'>
          <Typography variant='sm'>{t('infant.plural')}</Typography>
          <Typography variant='sm' className='text-neutral-300'>
            {t('info.under-2')}
          </Typography>
        </div>
        <div className='flex flex-row items-center justify-between'>
          <Icon
            variant='minus'
            width={20}
            color={infants === 0 ? '#d5d3d3' : '#797979'}
            className={cn(
              infants === 0 ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={() => {
              if (infants === 0) return;
              setInfants(infants - 1);
            }}
          />
          <Typography variant='sm' className='w-6 text-center'>
            {infants}
          </Typography>
          <Icon
            variant='plus'
            width={20}
            color={infantsBlockedCondition ? '#d5d3d3' : '#797979'}
            className={cn(
              infantsBlockedCondition ? 'cursor-not-allowed' : 'cursor-pointer',
            )}
            onClick={() => {
              if (infantsBlockedCondition) return;
              setInfants(infants + 1);
            }}
          />
        </div>
      </div>
      <Typography
        variant='xs2'
        className='flex items-start py-2 text-neutral-500'
      >
        {t('info.guest-room-max-allowed', { maxCapacity })}
      </Typography>
    </div>
  );

  const StepTwo = () => (
    <div className='flex h-screen flex-col'>
      <div className='m-4 flex-none'>
        <Typography variant='h1'>Cuantos vienen?</Typography>
        <Typography
          variant='sm'
          weight='medium'
          className='lowercase text-neutral-400'
        >
          {adults > 0 && `${adults} ${t('adult.' + ps(adults))}`}
          {childrens > 0 && `, ${childrens} ${t('children.' + ps(childrens))}`}
          {infants > 0 && `, ${infants} ${t('infant.' + ps(infants))}`}
        </Typography>
      </div>

      <div className='m-4 mt-7 flex-1'>
        <Typography variant='sm' weight='semibold' className='mb-4'>
          {t('info.guest')}
        </Typography>
        <GuestsData />
      </div>

      <div className='m-4 flex flex-none justify-between'>
        <Button
          type='button'
          variant='text'
          slim={true}
          onClick={() => setStep(1)}
        >
          Atras
        </Button>
        <Button
          type='button'
          variant='primary'
          onClick={() => null}
          icon={<Icon variant='search' color='white' />}
        >
          Buscar
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
