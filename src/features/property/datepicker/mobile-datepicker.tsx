/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import {
  useClickAway,
  useLocale,
  useQueryString,
  useSearchParamOrStore,
} from '@/hooks';
import {
  formatDateToString,
  formatStringToDate,
  getFormatedMontsDays,
} from '@/lib/time';
import { cn, ps } from '@/lib/utils';

import Button from '@/components/button';
import Drawer from '@/components/drawer';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import {
  useGlobalStore,
  useReservationQueryStore,
  useSelectedRoomtypeStore,
} from '@/store';

import {
  ADULTS,
  CALENDAR,
  CHECKIN,
  CHECKIN_DEFAULT_FUTURE_DAYS,
  CHECKOUT,
  CHECKOUT_DEFAULT_FUTURE_DAYS,
  CHILDRENS,
  GUESTSINFO,
  INFANTS,
  TOTAL_ADULTS_DEFAULT,
  TOTAL_CHILDRENS_DEFAULT,
  TOTAL_INFANTS_DEFAULT,
} from '@/constants';
import useWindowSize from '@/hooks/use-windowsize';

export default function MobileDatepickerComponent() {
  const { locale } = useLocale();
  const { t } = useTranslation();
  const router = useRouter();
  const { setReservation } = useReservationQueryStore();
  const { getCheckin, getCheckout } = useSearchParamOrStore();
  const { updateQueryString } = useQueryString();
  const { closeDatepickerDrawer } = useGlobalStore();
  const { size } = useWindowSize();
  const refView = useClickAway(() => {
    setShowHandler(null);
  });

  const [show, setShow] = useState<string | null>(null);

  const setShowHandler = useCallback((view) => setShow(view), []);

  // Calendar
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

  const [isOpenDatepickerDrawer, setOpenDatepickerDrawer] = useState(false);

  const onChange = useCallback((dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  }, []);

  const resetCalendarHandler = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  const resetGuestsInforHandler = useCallback(() => {
    setAdults(0);
    setChildrens(0);
    setInfants(0);
  }, []);

  const resetAllHandler = useCallback(() => {
    resetCalendarHandler();
    resetGuestsInforHandler();
  }, [resetCalendarHandler, resetGuestsInforHandler]);

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
    const unsub = useGlobalStore.subscribe(({ isOpenDatepickerDrawer }) => {
      if (isOpenDatepickerDrawer) {
        setOpenDatepickerDrawer(isOpenDatepickerDrawer);
        setShowHandler(null);
        return;
      }
      setOpenDatepickerDrawer(false);
    });

    return unsub;
  }, [setShowHandler]);

  const planDays = dayjs(endDate).diff(dayjs(startDate), 'days');
  const dayMonthYear =
    startDate && endDate
      ? getFormatedMontsDays(startDate, endDate, 'DD MMM. YYYY')
      : null;
  const dayMonth =
    startDate && endDate
      ? getFormatedMontsDays(startDate, endDate, 'DD MMM.')
      : null;

  // Select Guests
  const { getAdults, getChildrens, getInfants } = useSearchParamOrStore();
  const [adults, setAdults] = useState(
    () => getAdults() || TOTAL_ADULTS_DEFAULT,
  );
  const [childrens, setChildrens] = useState(
    () => getChildrens() || TOTAL_CHILDRENS_DEFAULT,
  );
  const [infants, setInfants] = useState(
    () => getInfants() || TOTAL_INFANTS_DEFAULT,
  );

  const {
    selectedRoom,
    selectedRoom: { maxCapacity, childCapacity },
  } = useSelectedRoomtypeStore();

  const totalGuests = adults + childrens + infants;
  const isMaxCapacityReached = false; //totalGuests >= (maxCapacity ?? 0);
  const adultsBlockedCondition = isMaxCapacityReached;
  const childrensBlockedCondition = !childCapacity && isMaxCapacityReached;
  const infantsBlockedCondition = !childCapacity && isMaxCapacityReached;

  /// Search - final step
  const handleSearch = useCallback(() => {
    if (!startDate || !endDate) return;
    setTimeout(() => {
      setReservation({
        checkin: formatDateToString(startDate),
        checkout: formatDateToString(endDate),
        adults,
        childrens,
        infants,
      });
      updateQueryString({
        [CHECKIN]: formatDateToString(startDate),
        [CHECKOUT]: formatDateToString(endDate),
        [ADULTS]: adults,
        [CHILDRENS]: childrens,
        [INFANTS]: infants,
      });
      router.push(`/room-type/${selectedRoom.id}`);
      closeDatepickerDrawer();
    }, 300);
  }, [
    adults,
    childrens,
    closeDatepickerDrawer,
    endDate,
    infants,
    router,
    selectedRoom.id,
    setReservation,
    startDate,
    updateQueryString,
  ]);

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

  const GuestsData = () => (
    <div
      ref={refView}
      className='right-0 w-full origin-top-right rounded-[24px] border-solid  border-white bg-white p-6 text-black outline-none drop-shadow-xl'
    >
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
              setAdults((pre) => pre - 1);
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
              setAdults((pre) => pre + 1);
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
              setChildrens((pre) => pre - 1);
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
              setChildrens((pre) => pre + 1);
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
              setInfants((pre) => pre - 1);
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
              setInfants((pre) => pre + 1);
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

  const Buttons = () => (
    <div className='m-4 flex flex-none justify-between'>
      <span>
        {show === CALENDAR && !!planDays && (
          <Button
            type='button'
            variant='text'
            slim={true}
            onClick={resetCalendarHandler}
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

        {show === GUESTSINFO && (
          <Button
            type='button'
            variant='text'
            slim={true}
            onClick={() => setShowHandler(CALENDAR)}
          >
            Regresar
          </Button>
        )}

        {!show && planDays && totalGuests > 0 && (
          <Button
            type='button'
            variant='text'
            slim={true}
            onClick={resetAllHandler}
          >
            Borrar todo
          </Button>
        )}
      </span>

      <span>
        {show === CALENDAR && !!planDays && (
          <Button
            type='button'
            variant='primary'
            onClick={() => setShowHandler(GUESTSINFO)}
          >
            Siguiente
          </Button>
        )}

        {show === GUESTSINFO && planDays && (
          <Button
            type='button'
            variant='primary'
            icon={
              <Icon variant='search' color='white' width={15} height={15} />
            }
            onClick={handleSearch}
          >
            Buscar
          </Button>
        )}

        {!show && (
          <Button
            type='button'
            variant='primary'
            disabled={!planDays}
            icon={
              <Icon variant='search' color='white' width={15} height={15} />
            }
            onClick={handleSearch}
          >
            Buscar
          </Button>
        )}
      </span>
    </div>
  );

  //conditions
  const calendarCondition = show === GUESTSINFO || !show;

  return (
    <Drawer
      icon='cancel'
      open={isOpenDatepickerDrawer}
      onClose={closeDatepickerDrawer}
    >
      <div className='flex h-screen flex-col '>
        <div className='flex-1 items-center justify-center'>
          {calendarCondition && (
            <Typography
              className='mb-4 flex flex-row justify-between justify-self-start rounded-[16px] border-solid border-white bg-white px-4 py-5 drop-shadow'
              onClick={() => setShowHandler(CALENDAR)}
            >
              <Typography
                variant='sm'
                className='text-neutral-400'
                weight='semibold'
              >
                {t('button.date.plural')}
              </Typography>

              {planDays < 1 && (
                <Typography
                  variant='sm'
                  className='text-neutral-500'
                  weight='semibold'
                >
                  {t('button.add-date.plural')}
                </Typography>
              )}

              {planDays > 0 && (
                <Typography
                  variant='sm'
                  className='text-neutral-500'
                  weight='semibold'
                >
                  {dayMonth}
                </Typography>
              )}
            </Typography>
          )}

          {!show && (
            <Typography
              className='mb-4 flex flex-row justify-between justify-self-start rounded-[16px] border-solid border-white bg-white px-4 py-5 drop-shadow'
              onClick={() => setShowHandler(GUESTSINFO)}
            >
              <Typography
                variant='sm'
                className='text-neutral-400'
                weight='semibold'
              >
                {t('button.guest.plural')}
              </Typography>

              {totalGuests < 1 && (
                <Typography
                  variant='sm'
                  className='text-neutral-500'
                  weight='semibold'
                >
                  {t('button.add-guest.plural')}
                </Typography>
              )}

              {totalGuests > 0 && (
                <Typography
                  variant='sm'
                  className='text-neutral-500'
                  weight='semibold'
                >
                  {adults > 0 && `${adults} ${t('adult.' + ps(adults))}`}
                  {childrens > 0 &&
                    `, ${childrens} ${t('children.' + ps(childrens))}`}
                  {infants > 0 && `, ${infants} ${t('infant.' + ps(infants))}`}
                </Typography>
              )}
            </Typography>
          )}

          {show === CALENDAR && (
            <div className='rounded-[24px] border-solid border-white bg-white py-3 pl-4 drop-shadow'>
              {size.height > 700 && (
                <div className='m-2 my-2 flex-none'>
                  <Typography variant='h1'>
                    {planDays
                      ? `${planDays} ${t('night.plural')}`
                      : t('info.when-is-the-travel')}
                  </Typography>

                  <Typography
                    variant='sm2'
                    weight='medium'
                    className='lowercase text-neutral-400'
                  >
                    {dayMonthYear ? dayMonthYear : t('info.select-your-date')}
                  </Typography>
                </div>
              )}
              <Calendar />
            </div>
          )}

          {show === GUESTSINFO && (
            <div className='rounded-[24px] border-solid border-white bg-white drop-shadow'>
              <div className='m-2 my-4 flex-none pl-4 pt-5 '>
                <Typography variant='h1'>Cuantos viajan contigo?</Typography>

                <Typography
                  variant='sm2'
                  className='text-left text-neutral-300'
                >
                  {adults > 0 && `${adults} ${t('adult.' + ps(adults))}`}
                  {childrens > 0 &&
                    `, ${childrens} ${t('children.' + ps(childrens))}`}
                  {infants > 0 && `, ${infants} ${t('infant.' + ps(infants))}`}
                </Typography>
              </div>
              <GuestsData />
            </div>
          )}
        </div>

        <Buttons />
      </div>
    </Drawer>
  );
}
