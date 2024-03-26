/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useQueryString, useSearchParamOrStore } from '@/hooks';
import { formatDateToString, getFormatedMontsDays } from '@/lib/time';
import { ps } from '@/lib/utils';

import { Drawer, Typography } from '@/components';

import {
  useDatepickerStore,
  useReservationStore,
  useSelectedRoomtypeStore,
} from '@/store';

import {
  CALENDAR,
  CHECKIN,
  CHECKOUT,
  GUESTSINFO,
  TOTAL_ADULTS,
  TOTAL_CHILDRENS,
  TOTAL_INFANTS,
} from '@/constants';

import GuestsDataComponent from '@/features/common/guest-datepicker/guests';
import ButtonsComponent from './buttons';
import CalendarComponent from './calendar';

export default function GuestsDatepickerDrawer({
  disableSubmit = false,
}: {
  disableSubmit?: boolean;
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { setReservation } = useReservationStore();
  const { checkinDate, checkoutDate } = useSearchParamOrStore();
  const { createQueryString, updateQueryString } = useQueryString();
  const { closeDatepickerDrawer } = useDatepickerStore();

  const [show, setShow] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(checkinDate);
  const [endDate, setEndDate] = useState<Date | null>(checkoutDate);
  const [isDatepickerOpen, setOpenDatepickerDrawer] = useState(false);

  const setShowHandler = useCallback((view) => setShow(view), []);

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
    const unsub = useDatepickerStore.subscribe(
      ({ isDatepickerOpen, isCalendarOpen, isGuestFormOpen }) => {
        if (isDatepickerOpen && !isCalendarOpen && !isGuestFormOpen) {
          setOpenDatepickerDrawer(isDatepickerOpen);
          setShowHandler(null);
          return;
        }
        if (isCalendarOpen) {
          setShowHandler(CALENDAR);
          setOpenDatepickerDrawer(true);
          return;
        }
        if (isGuestFormOpen) {
          setShowHandler(GUESTSINFO);
          setOpenDatepickerDrawer(true);
          return;
        }
        setOpenDatepickerDrawer(false);
      },
    );

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

  const [adults, setAdults] = useState(getAdults());
  const [childrens, setChildrens] = useState(getChildrens());
  const [infants, setInfants] = useState(getInfants());

  const {
    selectedRoom,
    selectedRoom: { maxCapacity, childCapacity },
  } = useSelectedRoomtypeStore();

  // computed values for guests
  const totalGuests = useMemo(
    () => adults + childrens + infants,
    [adults, childrens, infants],
  );
  const isMaxCapacityReached = useMemo(
    () => totalGuests >= (maxCapacity ?? 0),
    [maxCapacity, totalGuests],
  );
  const adultsBlockedCondition = useMemo(
    () => isMaxCapacityReached,
    [isMaxCapacityReached],
  );
  const childrensBlockedCondition = useMemo(
    () => !childCapacity && isMaxCapacityReached,
    [childCapacity, isMaxCapacityReached],
  );
  const infantsBlockedCondition = useMemo(
    () => !childCapacity && isMaxCapacityReached,
    [childCapacity, isMaxCapacityReached],
  );

  // conditions to show/hide components
  const headerCondition = useMemo(() => show === GUESTSINFO || !show, [show]);
  const showGuest = useMemo(() => show === GUESTSINFO, [show]);
  const showCalendar = useMemo(() => show === CALENDAR, [show]);

  /// Search - final step
  const handleSearch = useCallback(() => {
    if (!startDate || !endDate) return;
    try {
      setLoading(true);
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
        [TOTAL_ADULTS]: adults,
        [TOTAL_CHILDRENS]: childrens,
        [TOTAL_INFANTS]: infants,
      });
      const query = createQueryString({
        [CHECKIN]: formatDateToString(startDate),
        [CHECKOUT]: formatDateToString(endDate),
        [TOTAL_ADULTS]: adults,
        [TOTAL_CHILDRENS]: childrens,
        [TOTAL_INFANTS]: infants,
      });

      if (!disableSubmit) {
        router.push(`/room-type/${selectedRoom.id}?${query}`);
        return;
      }
      closeDatepickerDrawer();
      setLoading(false);
    } catch (error) {
      closeDatepickerDrawer();
      setLoading(false);
      // eslint-disable-next-line no-console
      console.error('Error on Datepicker handleSearch', error);
    }
  }, [
    startDate,
    endDate,
    setReservation,
    adults,
    childrens,
    infants,
    updateQueryString,
    createQueryString,
    disableSubmit,
    closeDatepickerDrawer,
    router,
    selectedRoom.id,
  ]);

  return (
    <Drawer
      icon='cancel'
      open={isDatepickerOpen}
      onClose={closeDatepickerDrawer}
      footer={
        <ButtonsComponent
          show={show}
          planDays={planDays}
          totalGuests={totalGuests}
          loading={loading}
          setShowHandler={setShowHandler}
          handleSearch={handleSearch}
          resetAllHandler={resetAllHandler}
          resetCalendarHandler={resetCalendarHandler}
        />
      }
    >
      <div className='md:layout flex h-max flex-col'>
        <div className='flex-1 items-center justify-center'>
          {headerCondition && (
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

          {showCalendar && (
            <CalendarComponent
              planDays={planDays}
              dayMonthYear={dayMonthYear}
              startDate={startDate}
              endDate={endDate}
              handleCalendarOpen={handleCalendarOpen}
              handleCalendarClose={handleCalendarClose}
              onChange={onChange}
            />
          )}

          {showGuest && (
            <GuestsDataComponent
              adults={adults}
              childrens={childrens}
              infants={infants}
              maxCapacity={maxCapacity}
              setAdults={setAdults}
              setChildrens={setChildrens}
              setInfants={setInfants}
              adultsBlockedCondition={adultsBlockedCondition}
              childrensBlockedCondition={childrensBlockedCondition}
              infantsBlockedCondition={infantsBlockedCondition}
              setShowHandler={setShowHandler}
            />
          )}
        </div>
      </div>
    </Drawer>
  );
}
