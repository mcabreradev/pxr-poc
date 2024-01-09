/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useQueryString from '@/hooks/use-querystring';
import { formatCurrency } from '@/lib/number';
import { cn, ps } from '@/lib/utils';

import Button from '@/components/button';
import Toggle from '@/components/toggle';
import Typography from '@/components/typography';

import useReservation from '@/store/use-reservation-persist.store';

import {
  CHECKIN,
  CHECKOUT,
  EXTRA,
  PLAN,
  PLAN_BREAKFAST,
  PLAN_BREAKFAST_COST,
  PLAN_COST,
  PLAN_NONBREAKFAST,
  PLAN_REFUNDABLE,
  PLAN_REFUNDABLE_PERCENT,
  PLAN_TAXES,
  TOTAL_ADULTS,
  TOTAL_CHILDRENS,
  TOTAL_INFANTS,
} from '@/constants';

import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import CancelationPolice from './cancelation-police';
import EditTripComponent from './edit-my-trip';

type Props = {
  className?: string;
  roomtype?: string;
};

const Container = tw.div`
md:sticky md:bottom-0 md:top-5 md:ml-5 md:mt-5 md:box-border md:flex md:h-min md:w-full md:flex-col md:rounded md:border-[1px] md:border-solid md:border-neutral-50 md:bg-white md:p-5 md:drop-shadow-lg
`;
const Section = tw.div`
px-4 text-black md:px-0
`;

export default function MyTrip({ className, roomtype }: Props) {
  const { t, i18n } = useTranslation();
  dayjs.locale(i18n.language);
  const { reservation, setReservation } = useReservation();
  const searchParams = useSearchParams();
  const { updateQueryString } = useQueryString();
  const { extra } = useSearchParamOrStore();

  const checkin = searchParams.get(CHECKIN)
    ? dayjs(searchParams.get(CHECKIN))
    : reservation?.checkin
    ? dayjs(reservation?.checkin)
    : dayjs(new Date());

  const checkout = searchParams.get(CHECKOUT)
    ? dayjs(searchParams.get(CHECKOUT))
    : reservation?.checkin
    ? dayjs(reservation?.checkout)
    : dayjs(new Date());

  const adults = Number(searchParams.get(TOTAL_ADULTS)) || reservation?.adults;
  const childrens =
    Number(searchParams.get(TOTAL_CHILDRENS)) || reservation?.childrens;
  const infants =
    Number(searchParams.get(TOTAL_INFANTS)) || reservation?.infants;

  const [selectedPlan, setSelectedPlan] = useState(
    searchParams.get(PLAN) || reservation?.plan,
  );
  const [breakfast, setBreakfast] = useState(
    searchParams.get(EXTRA) || reservation?.extra,
  );

  const handleCancelationPlan = useCallback((value) => {
    setSelectedPlan(value);
  }, []);

  const handleBreakfast = useCallback((event) => {
    const { checked } = event.target;
    setBreakfast(checked ? PLAN_BREAKFAST : PLAN_NONBREAKFAST);
  }, []);

  const [openEditModal, setEditModal] = useState(false);
  const handleEditModal = useCallback((value = true) => {
    setEditModal(value);
  }, []);

  useEffect(() => {
    if (!breakfast) return;
    updateQueryString({ [EXTRA]: breakfast });
  }, [breakfast, updateQueryString, setBreakfast]);

  const hasBreakfast = breakfast === PLAN_BREAKFAST;
  const planCost = PLAN_COST;
  const planDays = checkout.diff(checkin, 'days');
  const totalCost = planCost * planDays;
  const extraCost = PLAN_BREAKFAST_COST;
  const extraCostTotal = extra === PLAN_BREAKFAST ? PLAN_BREAKFAST_COST : 0;
  const cancelCost = totalCost * PLAN_REFUNDABLE_PERCENT;
  const cancelationCost = selectedPlan === PLAN_REFUNDABLE ? cancelCost : 0;
  const taxes = totalCost * PLAN_TAXES;
  const total = totalCost + extraCostTotal + cancelationCost + taxes;

  useEffect(() => {
    setReservation({
      planCost,
      totalCost,
      taxes,
      extraCost: extraCostTotal,
      cancelationCost,
      total,
      hasBreakfast,
      extra: breakfast,
      plan: selectedPlan,
    });
  }, [
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
  ]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 200);
    return () => clearTimeout(timer);
  }, [total]);

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
              {`${checkin.format('DD MMM YYYY')} - ${checkout.format(
                'DD MMM YYYY',
              )}`}
            </Typography>
          </div>
          <Typography
            variant='sm'
            className='cursor-pointer text-neutral-500 underline'
            onClick={handleEditModal}
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
            onClick={handleEditModal}
          >
            {t('title.edit')}
          </Typography>
        </div>

        <EditTripComponent
          isOpen={openEditModal}
          onClose={() => handleEditModal(false)}
        />
      </Section>

      <hr />

      <Section>
        <Typography variant='h2' weight='normal'>
          {t('title.price-details')}
        </Typography>
        <div className='flex flex-wrap justify-between py-3'>
          <Typography variant='sm' className='text-neutral-500'>
            {formatCurrency(planCost)} {t('per')}{' '}
            {checkout.diff(checkin, 'days')} {t('night.plural')}
          </Typography>

          <Typography variant='sm' className='text-neutral-500'>
            {formatCurrency(totalCost)}
          </Typography>
        </div>

        <CancelationPolice
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
            + {formatCurrency(extraCost)}
          </Typography>
        </div>

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
            + {formatCurrency(taxes)}
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
            {formatCurrency(total)}
          </Typography>
        </div>

        <div className='flex flex-wrap justify-between pt-3'>
          <Button
            className='font-semibold md:w-full'
            variant='primary'
            type='link'
            href={`/room-type/${roomtype}/details`}
            withSearchParams={true}
            fullWidth
          >
            {t('button.pay')}
          </Button>
        </div>
      </Section>
    </Container>
  );
}