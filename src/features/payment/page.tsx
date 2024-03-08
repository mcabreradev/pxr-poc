'use client';

import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';

import { useSessionStore, useUserStore } from '@/store';

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

export default function PaymentFeature({ roomTypeId, action }: Props) {
  const { t } = useTranslation();
  const { error, isError, isLoading, data: property } = usePropertyQuery();
  const {
    isError: roomError,
    isLoading: roomLoading,
    data: room,
  } = useRoomTypeQuery(roomTypeId);
  const { setLoginEnabled } = useUserStore();
  const { session } = useSessionStore();

  const actionPayment = !action;
  const actionSuccess = action === URL.SUCCESS;
  const actionError = action === URL.ERROR;

  useEffect(() => {
    setLoginEnabled(false);

    return () => {
      setLoginEnabled(true);
    };
  }, [setLoginEnabled]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
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
              {actionPayment && <StripePayment roomTypeId={roomTypeId} />}
              {actionSuccess && <StripePayment roomTypeId={roomTypeId} />}
              {actionError && <StripePayment roomTypeId={roomTypeId} />}
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
