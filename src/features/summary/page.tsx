import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';

import BackButton from '@/components/common/back-button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import useReservation from '@/store/use-reservation-persist.store';

import PriceDetails from '@/features/components/price-details';
import SkeletonComponent from '@/features/payment/skeleton';
import Cancellation from '@/features/summary/cancellation';
import SummaryRow from '@/features/summary/summaryRow';
import useRoomTypeQuery from '@/queries/use-roomtype';

type Props = {
  className?: string;
  roomtype: string;
};

const HR = tw.div`
  hr border-t-[10px] border-neutral-60
`;

const Container = tw.div`
`;

export default function SummaryFeature({ className, roomtype }: Props) {
  const { getCheckin, getCheckout, extra, plan } = useSearchParamOrStore();
  const {
    isError: roomError,
    isLoading: roomLoading,
    data: room,
  } = useRoomTypeQuery(roomtype);
  const { t } = useTranslation();
  const { reservation } = useReservation();

  const checkin = dayjs(getCheckin());
  const checkout = dayjs(getCheckout());

  //Temp
  const payment = { amount: reservation.total ?? null, currency: 'USD' };

  if (roomLoading) {
    return <SkeletonComponent />;
  }

  if (roomError) {
    return <span>Error</span>;
  }

  return (
    <Container
      className={cn('sm:absolute-container md:relative', className)}
      data-testid='test-element'
    >
      <BackButton href='/'>{t('title.summary')}</BackButton>
      <div className='mb-16'>
        <div className='layout'>
          <div className='mb-2 h-[200px] w-full bg-[url("/images/hotel/image318.png")] bg-cover'>
            <Typography
              variant='h1'
              weight='medium'
              className='mx-4 my-2 pt-3 text-white'
            >
              {t('summary.stay')} Terrazas de La Posta
            </Typography>
            <div className='mx-4 flex flex-row'>
              <Icon
                variant='star'
                height='18px'
                width='18px'
                color='white'
                className='mt-0.5'
              />
              <Typography variant='sm' className='ml-1 text-white'>
                4.5 (3)
              </Typography>
            </div>
          </div>
          <div className='mb-2 flex w-full flex-row divide-x px-0.5'>
            <div className='basis-1/2 px-4 py-2'>
              <Typography variant='sm' weight='bold'>
                {t('checkin')}
              </Typography>
              <Typography variant='sm' weight='normal'>
                Lunes, 07 may 2023
              </Typography>
              <Typography variant='sm' weight='normal'>
                03:00pm
              </Typography>
            </div>
            <div className='basis-1/2 px-4 py-2'>
              <Typography variant='sm' weight='bold'>
                {t('checkout')}
              </Typography>
              <Typography variant='sm' weight='normal'>
                Viernes, 11 may 2023
              </Typography>
              <Typography variant='sm' weight='normal'>
                11:00am
              </Typography>
            </div>
          </div>
          <div className='mx-4 border-b'></div>
          <SummaryRow
            leftMainText={t('summary.address')}
            leftSecondaryText='Pje Santa Rosa de Lima s/n, Purmamarca, Argentina'
            rightMainText={t('summary.directions')}
            rightMainTag='a'
          />
          <SummaryRow
            leftMainText={t('summary.guests')}
            leftSecondaryText='2'
            rightMainText={t('summary.fill-data')}
            rightMainTag='a'
          />
          <SummaryRow
            leftMainText={t('summary.cost')}
            rightMainText='$ 470.00 USD'
            className='mb-6'
          />
          <SummaryRow
            leftMainText={t('summary.reservation-code')}
            rightMainText='SFFE3553'
            className='mb-5'
          />
          <div className='mx-4 border-b'></div>
          <div className='mx-4 my-5 flex flex-row'>
            <Typography variant='sm' tag='a' className='text-black'>
              {t('summary.contact')}
            </Typography>
            <Icon
              variant='internet'
              color='#757575'
              height='17px'
              width='17px'
              className='ml-1 mt-1'
            />
            <Icon
              variant='email'
              color='#757575'
              height='20px'
              width='20px'
              className='ml-1 mt-0.5'
            />
            <Icon
              variant='phone'
              color='#757575'
              height='20px'
              width='20px'
              className='ml-1 mt-0.5'
            />
            <Icon
              variant='whatsapp'
              height='20px'
              width='20px'
              className='ml-1 mt-0.5'
            />
          </div>
          <div className='mx-4 border-b'></div>
          <div className='mx-4 my-5 flex flex-row'>
            <Typography variant='sm' tag='a' className='text-black'>
              {t('summary.hotel-information')}
            </Typography>
          </div>
          <HR />
          <PriceDetails
            room={room}
            reservation={reservation}
            extra={extra}
            plan={plan}
            checkin={checkin}
            checkout={checkout}
          />
          <HR />
          <section>
            <Typography variant='h2' weight='normal' className='px-4'>
              {t('summary.payment-title')}
            </Typography>
            {payment.amount ? (
              <SummaryRow
                leftMainText={`$ ${payment.amount} ${payment.currency}`}
                rightMainText={t('summary.invoice')}
                rightMainTag='a'
                className='mb-5'
              />
            ) : (
              <SummaryRow
                leftMainText={t('summary.no-payment')}
                rightMainText=''
                className='mb-5'
              />
            )}
          </section>
          <HR />
          <Cancellation plan={plan} />
          <HR />
          <section>
            <div className='px-4'>
              <Typography variant='h2' weight='normal'>
                {t('info.taxes-details')}
              </Typography>
              <div className='my-3' />
              <Typography variant='sm' className='text-neutral-500'>
                {t('summary.taxes-reminder-1')} ${payment.amount}{' '}
                {payment.currency} {t('summary.taxes-reminder-2')}
              </Typography>
            </div>
          </section>
          <HR />
        </div>
      </div>
    </Container>
  );
}
