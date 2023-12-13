import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn, ps } from '@/lib/utils';

import Button from '@/components/button';
import Radio from '@/components/radio';
import Toggle from '@/components/toggle';
import Typography from '@/components/typography';

import useReservation from '@/store/use-reservation.store';

import {
  CHECKIN,
  CHECKOUT,
  TOTAL_ADULTS,
  TOTAL_CHILDREN,
  TOTAL_INFANTS,
  URL,
} from '@/constants';

interface Props {
  className?: string;
  roomtype?: string;
}

const Container = tw.div`
md:sticky md:bottom-0 md:top-5 md:ml-5 md:mt-5 md:box-border md:flex md:h-min md:w-full md:flex-col md:rounded md:border-[1px] md:border-solid md:border-neutral-50 md:bg-white md:p-5 md:drop-shadow-lg
`;
const Section = tw.div`
px-4 text-black md:px-0
`;

export default function MyTrip({ className, roomtype }: Props) {
  const { t, i18n } = useTranslation();
  dayjs.locale(i18n.language);
  const { reservation } = useReservation();
  const searchParams = useSearchParams();

  const checkin =
    dayjs(searchParams.get(CHECKIN)) || dayjs(reservation?.checkin);
  const checkout =
    dayjs(searchParams.get(CHECKOUT)) || dayjs(reservation?.checkout);
  const adults = Number(searchParams.get(TOTAL_ADULTS)) || reservation?.adults;
  const childrens =
    Number(searchParams.get(TOTAL_CHILDREN)) || reservation?.childrens;
  const infants =
    Number(searchParams.get(TOTAL_INFANTS)) || reservation?.infants;

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
          <Typography variant='sm' className='text-neutral-500 underline'>
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

            {childrens && (
              <Typography variant='sm' className='mb-1 text-neutral-500'>
                {childrens > 0 &&
                  `${childrens} ${t('children.' + ps(childrens))}`}
              </Typography>
            )}

            {infants && (
              <Typography variant='sm' className='mb-1 text-neutral-500'>
                {infants > 0 && `${infants} ${t('infant.' + ps(infants))}`}
              </Typography>
            )}
          </div>
          <Typography variant='sm' className='text-neutral-500 underline'>
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
            $ 100.00 {t('per')} {checkout.diff(checkin, 'days')}{' '}
            {t('night.plural')}
          </Typography>

          <Typography variant='sm' className='text-neutral-500'>
            $ 400.00
          </Typography>
        </div>
        <div className='flex flex-wrap justify-between pb-0 pt-2'>
          <div>
            <Typography
              variant='sm'
              weight='semibold'
              className='text-neutral-400'
            >
              {t('info.cancellation-policy')}
            </Typography>
          </div>
        </div>
        <div className='flex flex-wrap justify-between py-1'>
          <Radio label={t('info.non-refundable')} name='cancellation-policy' />
          <Typography variant='sm' className='text-neutral-500'>
            +$ 0.00
          </Typography>
        </div>
        <div className='flex flex-wrap justify-between py-1'>
          <Radio
            label={t('info.refundable')}
            subtitle={t('info.free-cancellation-before')}
            name='cancellation-policy'
          />
          <Typography variant='sm' className='text-neutral-500'>
            +$ 0.00
          </Typography>
        </div>

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
          <Toggle label={t('info.breakfast')} />
          <Typography variant='sm' className='text-neutral-500'>
            +$ 10.00
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
            +$ 50.00
          </Typography>
        </div>

        <div className='flex flex-wrap justify-between py-3'>
          <Typography variant='sm' className='font-semibold text-neutral-500'>
            Total (USD)
          </Typography>

          <Typography variant='sm' className='font-semibold text-neutral-500'>
            $ 450.00
          </Typography>
        </div>

        <div className='flex flex-wrap justify-between py-3'>
          <Button
            className='font-semibold'
            variant='primary'
            type='link'
            href={`/room-type/${roomtype}/details`}
            withParams={true}
            params={`${URL.ACTION}=auth`}
            fullWidth
          >
            {t('button.pay')}
          </Button>
        </div>
      </Section>
    </Container>
  );
}
