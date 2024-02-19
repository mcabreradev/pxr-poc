import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';

import BackButton from '@/components/common/back-button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import useReservation from '@/store/use-reservation-persist.store';

import HotelRules from '@/features/components/hotel-rules';
import PriceDetails from '@/features/components/price-details';
import SkeletonComponent from '@/features/payment/skeleton';
import Cancellation from '@/features/summary/cancellation';
import SummaryRow from '@/features/summary/summaryRow';
import useFetchProperty from '@/queries/use-property';
import useRoomTypeQuery from '@/queries/use-roomtype';

import data from '../payment/data.json';
require('dayjs/locale/es'); //This require is necessary to get the weekday name in correct language

type Props = {
  className?: string;
  roomtype: string;
};

const HR = tw.div`
  hr border-t-[10px] border-neutral-60
`;

const Container = tw.div`
`;

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

function formatTime(timestring: string) {
  const sections: string[] = timestring.split(':');
  const hour: number = Number(sections[0]);
  let meridiem: string;
  let hourStr: string;

  if (hour <= 12) {
    meridiem = hour === 12 ? 'PM' : 'AM';
    hourStr = hour < 10 ? '0' + hour.toString() : hour.toString();
  } else {
    const hourMod12 = hour % 12;
    meridiem = hour === 0 ? 'AM' : 'PM';
    hourStr = hourMod12 < 10 ? '0' + hourMod12.toString() : hour.toString();
  }

  return `${hourStr}:${sections[1]} ${meridiem}`;
}

export default function SummaryFeature({ className, roomtype }: Props) {
  const { getCheckin, getCheckout, extra, plan } = useSearchParamOrStore();
  const { error, isLoading, data: property } = useFetchProperty();
  const {
    isError: roomError,
    isLoading: roomLoading,
    data: room,
  } = useRoomTypeQuery(roomtype);
  const { t, i18n } = useTranslation();
  const { reservation } = useReservation();

  const checkin = dayjs(getCheckin());
  const checkout = dayjs(getCheckout());
  const passengers =
    (reservation.adults ?? 0) +
    (reservation.childrens ?? 0) +
    (reservation.infants ?? 0);

  //Temp
  const payment = { amount: reservation.total ?? null, currency: 'USD' };

  if (isLoading || roomLoading) {
    return <SkeletonComponent />;
  }

  if (error || roomError) {
    return <span>Error</span>;
  }

  return (
    <Container
      className={cn('sm:absolute-container md:relative', className)}
      data-testid='test-element'
    >
      <BackButton href='/'>{t('title.summary')}</BackButton>
      <div className='mb-1'>
        <div className='layout'>
          <div className='mb-2 h-[200px] w-full bg-[url("/images/hotel/image318.png")] bg-cover md:h-[250px]'>
            <Typography
              variant='h1'
              weight='medium'
              className='mx-4 my-2 pt-3 text-white'
            >
              {t('summary.stay')} {property.name}
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
                {property.reviewRatingCount
                  ? `${property.reviewRatingScore} (${property.reviewRatingCount})`
                  : 'No reviews yet'}
              </Typography>
            </div>
          </div>
          <div className='mb-2 flex w-full flex-row divide-x px-0.5'>
            <div className='basis-1/2 px-4 py-2'>
              <Typography variant='sm' weight='bold'>
                {t('checkin')}
              </Typography>
              <Typography variant='sm' weight='normal'>
                {capitalize(
                  checkin.locale(i18n.language).format('dddd, DD MMM YYYY'),
                )}
              </Typography>
              <Typography variant='sm' weight='normal'>
                {formatTime(property.checkInTime)}
              </Typography>
            </div>
            <div className='basis-1/2 px-4 py-2'>
              <Typography variant='sm' weight='bold'>
                {t('checkout')}
              </Typography>
              <Typography variant='sm' weight='normal'>
                {capitalize(
                  checkout.locale(i18n.language).format('dddd, DD MMM YYYY'),
                )}
              </Typography>
              <Typography variant='sm' weight='normal'>
                {formatTime(property.checkOutTime)}
              </Typography>
            </div>
          </div>
          <div className='mx-4 border-b'></div>
          <SummaryRow
            leftMainText={t('summary.address')}
            leftSecondaryText={`${property.street}, ${property.city}, ${property.state}, ${property.countryName}`}
            rightMainText={t('summary.directions')}
            rightMainTag='a'
          />
          <SummaryRow
            leftMainText={t('summary.guests')}
            leftSecondaryText={passengers.toString()}
            rightMainText={t('summary.fill-data')}
            rightMainTag='a'
          />
          <SummaryRow
            leftMainText={t('summary.cost')}
            rightMainText={`$ ${reservation.total}`}
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
                {t('summary.taxes-reminder-1')} ${reservation.taxes}{' '}
                {payment.currency} {t('summary.taxes-reminder-2')}
              </Typography>
            </div>
          </section>
          <HR />
          <section className='px-4'>
            <div className='py-0 pb-7'>
              <HotelRules rules={data.rules} />
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}
