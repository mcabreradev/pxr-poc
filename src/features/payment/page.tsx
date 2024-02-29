'use client';

import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';

import { useSessionStore } from '@/store';

import NotConnected from '@/app/not-connected';
import { ERRORS, URL } from '@/constants';
import StripePayment from '@/features/payment/strype-payment';
import { usePropertyQuery, useRoomTypeQuery } from '@/queries';

import MyTripDetails from './my-trip-details';
import SkeletonComponent from './skeleton';

type Props = {
  roomTypeId: number;
  action?: string;
};

const Container = tw.div`
`;

export default function PaymentFeature({ roomTypeId, action }: Props) {
  const { t } = useTranslation();
  const { error, isError, isLoading, data: property } = usePropertyQuery();
  const {
    isError: roomError,
    isLoading: roomLoading,
    data: room,
  } = useRoomTypeQuery(roomTypeId);
  const { session } = useSessionStore();

  const actionPayment = !action;
  const actionSuccess = action === URL.SUCCESS;
  const actionError = action === URL.ERROR;

  if (!session) {
    redirect('/');
  }

  if (isLoading || roomLoading) {
    return <SkeletonComponent />;
  }

  if (isError || roomError) {
    if ((error as unknown as { code: string }).code === ERRORS.ERR_NETWORK) {
      return <NotConnected />;
    }
    return <span>Error</span>;
  }

  return (
    <Container
      data-testid='test-element'
      className={cn('sm:absolute-container md:relative')}
    >
      <BackButton href={`/room-type/${roomTypeId}`}>
        {t('title.room-confirm-reserve')}
      </BackButton>

      <div className='mb-16'>
        <div className='layout relative flex flex-col md:flex-row-reverse'>
          <div className='w-full md:w-4/12'>
            <MyTripDetails property={property} room={room} />
          </div>

          <div className='w-full md:w-8/12'>
            <section className='p-4 md:min-w-[400px] md:max-w-[560px]'>
              {actionPayment && <StripePayment />}
              {actionSuccess && <StripePayment />}
              {actionError && <StripePayment />}
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}
