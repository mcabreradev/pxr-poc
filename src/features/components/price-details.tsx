import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { formatCurrency } from '@/lib/number';

import Typography from '@/components/typography';

import { PLAN_BREAKFAST } from '@/constants';

import { Reservation } from '@/types';

type Props = {
  room: { name: string };
  reservation: Reservation;
  extra: string | null | undefined;
  plan: string | number | null | undefined;
  checkin: dayjs.Dayjs;
  checkout: dayjs.Dayjs;
};

export default function PriceDetails({
  room,
  reservation,
  extra,
  // plan,
  checkin,
  checkout,
}: Props) {
  const { t, i18n } = useTranslation();

  const hasBreakfast = reservation.extra === PLAN_BREAKFAST;
  const planDays = checkout.diff(checkin, 'days');
  const totalCost = reservation.totalCost ?? 0;
  const extraCostTotal = extra ? 10 : 0;
  const taxes = reservation.taxes ?? 0;
  const total = reservation.total ?? 0;

  return (
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
          {/* <Typography variant='sm' className='text-neutral-500'>
            {t(`info.${plan}`)}
          </Typography> */}
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
          Total (EUR)
        </Typography>

        <Typography variant='sm' className='font-semibold text-neutral-500'>
          {formatCurrency(total, 'EUR')}
        </Typography>
      </div>
    </section>
  );
}
