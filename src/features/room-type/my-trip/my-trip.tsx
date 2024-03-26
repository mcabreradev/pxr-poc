/* eslint-disable simple-import-sort/imports */
'use client';
import dayjs from 'dayjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import {
  useCheckinCheckoutHook,
  useQueryString,
  useSearchParamOrStore,
} from '@/hooks';
import { formatCurrency } from '@/lib/number';
import { cn, ps } from '@/lib/utils';

import { Button, Toggle, Typography } from '@/components';

import {
  useDatepickerStore,
  useReservationStore,
  useSelectedRoomtypeStore,
  useUserStore,
} from '@/store';

import { Product, Ratesplan } from '@/types';

import {
  EXTRA,
  PLAN,
  PLAN_BREAKFAST,
  PLAN_BREAKFAST_COST,
  PLAN_NONBREAKFAST,
  PLAN_REFUNDABLE,
  PLAN_REFUNDABLE_PERCENT,
  TOTAL_ADULTS,
  TOTAL_CHILDRENS,
  TOTAL_INFANTS,
} from '@/constants';
import { useRatesPlanQuery } from '@/queries';

import { useCheckGuestMutation } from '@/mutations';
import CancelationPolice from './cancelation-police';
import RatesPlansSkeleton from './rates-plan-skeleton';

type Props = {
  className?: string;
  roomTypeId?: number;
};

const Container = tw.div`
md:sticky md:bottom-0 md:top-5 md:ml-5 md:mt-5 md:box-border md:flex md:h-min md:w-full md:flex-col md:rounded md:border-[1px] md:border-solid md:border-neutral-50 md:bg-white md:p-5 md:drop-shadow-lg
`;
const Section = tw.div`
px-4 text-black md:px-0
`;

export default function MyTrip({ className, roomTypeId }: Props) {
  const { t, i18n } = useTranslation();
  dayjs.locale(i18n.language);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUserStore();
  const { openCalendarDrawer, openGuestFormDrawer } = useDatepickerStore();
  const { reservation, setReservation } = useReservationStore();
  const { checkin, checkout, checkinDayjs, checkoutDayjs } =
    useCheckinCheckoutHook();
  const { selectedRoom } = useSelectedRoomtypeStore();
  const checkGuestMutation = useCheckGuestMutation();
  const { updateQueryString } = useQueryString();
  const { extra } = useSearchParamOrStore();
  const { data: ratesPlan, isLoading: loadingRatePlan } = useRatesPlanQuery({
    roomTypeId,
    checkin,
    checkout,
  });

  const [loading, setLoading] = useState(false);

  const adults = useMemo(
    () => Number(searchParams.get(TOTAL_ADULTS)) || reservation?.adults,
    [reservation?.adults, searchParams],
  );

  const childrens = useMemo(
    () => Number(searchParams.get(TOTAL_CHILDRENS)) || reservation?.childrens,
    [reservation?.childrens, searchParams],
  );

  const infants = useMemo(
    () => Number(searchParams.get(TOTAL_INFANTS)) || reservation?.infants,
    [reservation?.infants, searchParams],
  );

  const [selectedPlan, setSelectedPlan] = useState(
    searchParams.get(PLAN) || reservation?.plan,
  );
  const [breakfast, setBreakfast] = useState(
    () => searchParams.get(EXTRA) || reservation?.extra || PLAN_NONBREAKFAST,
  );

  const handleCancelationPlan = useCallback((value) => {
    setSelectedPlan(value);
  }, []);

  const handleBreakfast = useCallback((event) => {
    const { checked } = event.target;
    setBreakfast(checked ? PLAN_BREAKFAST : PLAN_NONBREAKFAST);
  }, []);

  const ratesPlanIndex = useMemo(
    () => (breakfast === PLAN_BREAKFAST ? 1 : 0),
    [breakfast],
  );

  const planCost = useMemo(
    () =>
      (
        selectedRoom.ratesPlan?.[ratesPlanIndex] as unknown as {
          amountBeforeTax: number;
        }
      )?.amountBeforeTax,
    [ratesPlanIndex, selectedRoom.ratesPlan],
  );

  const currency = useMemo(
    () =>
      (
        selectedRoom.ratesPlan?.[ratesPlanIndex] as unknown as {
          currency: string;
        }
      )?.currency,
    [ratesPlanIndex, selectedRoom.ratesPlan],
  );

  const planCostWithTaxes = useMemo(
    () =>
      (
        selectedRoom.ratesPlan?.[ratesPlanIndex] as unknown as {
          rate: number;
        }
      )?.rate,
    [ratesPlanIndex, selectedRoom.ratesPlan],
  );

  const planId = useMemo(
    () =>
      (
        selectedRoom.ratesPlan?.[ratesPlanIndex] as Ratesplan as {
          ratePlanId: number;
        }
      )?.ratePlanId,
    [ratesPlanIndex, selectedRoom.ratesPlan],
  );

  const product = useMemo(
    () => selectedRoom.ratesPlan?.[ratesPlanIndex],
    [ratesPlanIndex, selectedRoom.ratesPlan],
  );

  const planDays = useMemo(
    () => checkoutDayjs.diff(checkinDayjs, 'days'),
    [checkinDayjs, checkoutDayjs],
  );
  const totalCost = useMemo(() => planCost * planDays, [planCost, planDays]);

  const totalCostWithTaxes = useMemo(
    () => planCostWithTaxes * planDays,
    [planCostWithTaxes, planDays],
  );

  const extraCost = PLAN_BREAKFAST_COST;

  const extraCostTotal = useMemo(
    () => (extra === PLAN_BREAKFAST ? extraCost : 0),
    [extra, extraCost],
  );

  const cancelCost = useMemo(
    () => totalCost * PLAN_REFUNDABLE_PERCENT,
    [totalCost],
  );

  const cancelationCost = useMemo(
    () => (selectedPlan === PLAN_REFUNDABLE ? cancelCost : 0),
    [selectedPlan, cancelCost],
  );

  const taxes = useMemo(
    () => totalCostWithTaxes - totalCost,
    [totalCostWithTaxes, totalCost],
  );
  // const total = useMemo(() => totalCost + extraCostTotal + cancelationCost + taxes, [totalCost, extraCostTotal, cancelationCost, taxes]) ;
  const total = totalCostWithTaxes;
  const hasBreakfast = useMemo(() => breakfast === PLAN_BREAKFAST, [breakfast]);

  useEffect(() => {
    if (!breakfast) return;
    updateQueryString({ [EXTRA]: breakfast });
  }, [breakfast, hasBreakfast, ratesPlan, updateQueryString]);

  useEffect(() => {
    setReservation({
      roomTypeId,
      currency,
      planCost,
      totalCost,
      taxes,
      extraCost: extraCostTotal,
      cancelationCost,
      total,
      hasBreakfast: !!extraCostTotal,
      extra: breakfast,
      plan: planId,
      product: product as Product,
      selectedRoom,
    });
  }, [
    roomTypeId,
    breakfast,
    cancelationCost,
    extraCostTotal,
    planCost,
    setReservation,
    taxes,
    total,
    totalCost,
    hasBreakfast,
    selectedPlan,
    product,
    planId,
    currency,
    selectedRoom,
  ]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 200);
    return () => clearTimeout(timer);
  }, [total]);

  const checkGuest = useCallback(
    async ({ sub, given_name, family_name }) => {
      const { guestPaxerId } = await checkGuestMutation.mutateAsync({
        guestIAMId: sub,
        displayName: given_name,
        lastName: family_name,
        firstName: given_name,
        acceptedTerms: true,
      });

      setReservation({
        guestPaxerId,
      });
    },
    [checkGuestMutation, setReservation],
  );

  /**
   * Handle payment submit
   */
  const handlePaymentSubmit = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);

    if (user && user.isAuth) {
      checkGuest({
        sub: user.sub,
        given_name: user.given_name,
        family_name: user.family_name,
      });
      // redirigir a la pagina de checkout
      router.push(`${pathname}/payment?${params.toString()}`);
      return;
    }

    router.push(`${pathname}/details?action=auth&${params.toString()}`);
  }, [checkGuest, pathname, router, searchParams, user]);

  return (
    <Container className={cn(className)} data-testid='test-element'>
      <Section>
        <Typography variant='h2' weight='normal'>
          {t('title.my-trip')}
        </Typography>
        <div className='flex flex-wrap justify-between py-2'>
          <div>
            <Typography
              variant='sm'
              weight='semibold'
              className='text-neutral-400'
            >
              {t('date.plural')}
            </Typography>
            <Typography variant='sm' className='text-neutral-500'>
              {`${checkinDayjs.format('DD MMM YYYY')} - ${checkoutDayjs.format(
                'DD MMM YYYY',
              )}`}
            </Typography>
          </div>
          <Typography
            variant='sm'
            className='cursor-pointer text-neutral-500 underline'
            onClick={openCalendarDrawer}
          >
            {t('title.edit')}
          </Typography>
        </div>
        <div className='flex flex-wrap justify-between py-2'>
          <div>
            <Typography
              variant='sm'
              weight='semibold'
              className='text-neutral-400'
            >
              {t('guest.plural')}
            </Typography>

            {adults && (
              <Typography variant='sm' className='mb-1 text-neutral-500'>
                {adults > 0 && `${adults} ${t('adult.' + ps(adults))}`}
              </Typography>
            )}

            {!!childrens && (
              <Typography variant='sm' className='mb-1 text-neutral-500'>
                {childrens > 0 &&
                  `${childrens} ${t('children.' + ps(childrens))}`}
              </Typography>
            )}

            {!!infants && (
              <Typography variant='sm' className='mb-1 text-neutral-500'>
                {infants > 0 && `${infants} ${t('infant.' + ps(infants))}`}
              </Typography>
            )}
          </div>
          <Typography
            variant='sm'
            className='cursor-pointer text-neutral-500 underline'
            onClick={openGuestFormDrawer}
          >
            {t('title.edit')}
          </Typography>
        </div>
      </Section>

      <hr />

      <Section>
        <Typography variant='h2' weight='normal'>
          {t('title.price-details')}
        </Typography>
        <div className='flex flex-wrap justify-between py-3'>
          <Typography variant='sm' className='text-neutral-500'>
            {formatCurrency(planCost, currency)} {t('per')} {planDays}{' '}
            {t('night.plural')}
          </Typography>

          <Typography variant='sm' className='text-neutral-500'>
            {formatCurrency(totalCost, currency)}
          </Typography>
        </div>

        {loadingRatePlan ? (
          <RatesPlansSkeleton />
        ) : (
          <>
            <CancelationPolice
              ratesPlan={ratesPlan}
              plan={selectedPlan}
              onChange={handleCancelationPlan}
              cancelCost={cancelCost}
            />

            <div className='flex flex-wrap justify-between pb-0 pt-2'>
              <div>
                <Typography
                  variant='sm'
                  weight='semibold'
                  className='text-neutral-400'
                >
                  {t('info.extras')}
                </Typography>
              </div>
            </div>

            <div className='flex flex-wrap justify-between py-1'>
              <Toggle
                label={t('breakfast')}
                value={breakfast}
                onChange={handleBreakfast}
                toggled={hasBreakfast}
              />

              <Typography
                variant='sm'
                className={cn('text-neutral-500', {
                  'text-gray-500': !hasBreakfast,
                })}
              >
                {/* + {formatCurrency(extraCost)} */}
              </Typography>
            </div>
          </>
        )}

        <div className='flex flex-wrap justify-between pb-0 pt-4'>
          <div>
            <Typography
              variant='sm'
              weight='semibold'
              className='text-neutral-400'
            >
              {t('info.taxes')}
            </Typography>
          </div>
        </div>

        <div className='flex flex-wrap justify-between py-1'>
          <Typography variant='xs' className='w-3/4 text-neutral-500'>
            {t('info.taxes-description')}
          </Typography>

          <Typography variant='sm' className='text-neutral-500'>
            + {formatCurrency(taxes, currency)}
          </Typography>
        </div>

        <div className='flex flex-wrap justify-between py-3'>
          <Typography variant='sm' className='font-semibold text-neutral-500'>
            Total (USD)
          </Typography>

          <Typography
            variant='sm'
            className={cn(
              'font-semibold text-neutral-500 transition-colors duration-500',
              { 'animate-pulse': animate },
            )}
          >
            {formatCurrency(total, currency)}
          </Typography>
        </div>

        <div className='flex flex-wrap justify-between pt-3'>
          <Button
            className='font-semibold md:w-full'
            variant='primary'
            type='button'
            fullWidth
            onClick={handlePaymentSubmit}
            loading={loading}
          >
            {t('button.pay')}
          </Button>
        </div>
      </Section>
    </Container>
  );
}
