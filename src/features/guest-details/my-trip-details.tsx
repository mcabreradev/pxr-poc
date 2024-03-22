/* eslint-disable simple-import-sort/imports */
import dayjs from 'dayjs';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import { ps } from '@/lib/utils';
import useReservationQuery from '@/store/use-reservation.store';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { PLAN_BREAKFAST } from '@/constants';
import { formatCurrency } from '@/lib/number';
import type { PropertyType } from '@/types';

type Props = {
  property: PropertyType;
  room: { name: string };
};

const HR = tw.div`
  hr border-t-[10px] border-neutral-60
`;

export default function MyTripDetails({ property, room }: Props) {
  const { t, i18n } = useTranslation();
  dayjs.locale(i18n.language);

  const {
    getAdults,
    getCheckin,
    getCheckout,
    getChildrens,
    getInfants,
    extra,
    plan,
  } = useSearchParamOrStore();
  const { reservation } = useReservationQuery();

  const checkin = dayjs(getCheckin());
  const checkout = dayjs(getCheckout());

  const adults = Number(getAdults());
  const childrens = Number(getChildrens());
  const infants = Number(getInfants());

  const hasBreakfast = reservation.extra === PLAN_BREAKFAST;
  const planDays = checkout.diff(checkin, 'days');
  const totalCost = reservation.totalCost ?? 0;
  const extraCostTotal = extra ? 10 : 0;
  const taxes = reservation.taxes ?? 0;
  const total = reservation.total ?? 0;

  return (
    <div
      className='border-[1px] border-solid border-neutral-60 md:box-border md:rounded'
      data-testid='test-element'
    >
      <section className='flex h-auto w-full flex-row items-center p-4 '>
        <Image
          src={property.photos[0].url ?? ''}
          className='relative h-[75px] w-auto rounded'
          width={1}
          height={1}
          alt='room'
        />

        <div className='pl-3'>
          <Typography
            variant='base'
            weight='semibold'
            className='text-neutral-400'
          >
            {property.name}
          </Typography>

          <Typography variant='xs' weight='normal' className='text-neutral-400'>
            {`${property.street}`}
          </Typography>

          <div className='flex flex-row items-center text-[12px] text-neutral-500'>
            <Icon variant='star' width='16px' />
            <p>{property.reviewRatingScore}</p>
            <p className='pl-1 text-neutral-400'>{`(${property.reviewRatingCount})`}</p>
          </div>
        </div>
      </section>
      <HR />
      <section className='px-4'>
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
        </div>
      </section>
      <HR />
      <section className='px-4'>
        <Typography variant='h2' weight='normal'>
          {t('title.price-details')}
        </Typography>
        <div className='flex flex-wrap justify-between py-3'>
          <div>
            <Typography
              variant='sm'
              weight='semibold'
              className='text-neutral-500'
            >
              {room.name[i18n.language]}
            </Typography>
            <Typography variant='sm' className='text-neutral-500'>
              {planDays} {t('night.plural')}
            </Typography>
            <Typography variant='sm' className='text-neutral-500'>
              {t(`info.${plan ?? 'non-refundable'}`)}
            </Typography>
          </div>

          <Typography variant='sm' className='text-neutral-500'>
            {formatCurrency(totalCost, 'EUR')}
          </Typography>
        </div>

        {hasBreakfast && (
          <>
            <div className='flex flex-wrap justify-between pb-0 pt-4'>
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
              <Typography variant='xs' className='w-3/4 text-neutral-500'>
                {t(`info.${reservation.extra}`)}
              </Typography>

              <Typography variant='sm' className='text-neutral-500'>
                + {formatCurrency(extraCostTotal, 'EUR')}
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
            + {formatCurrency(taxes, 'EUR')}
          </Typography>
        </div>

        <div className='flex flex-wrap justify-between py-3'>
          <Typography variant='sm' className='font-semibold text-neutral-500'>
            Total (USD)
          </Typography>

          <Typography variant='sm' className='font-semibold text-neutral-500'>
            {formatCurrency(total, 'EUR')}
          </Typography>
        </div>
      </section>
    </div>
  );
}
