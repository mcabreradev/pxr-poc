'use client';

import { motion } from 'framer-motion';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';

import { useSessionStore } from '@/store';

import { ACTION, QUERY } from '@/constants';
import { usePropertyQuery, useRoomTypeQuery } from '@/queries';

import FormAuthComponent from './form-auth';
import FormForgotComponent from './form-forgot';
import FormIdentificationComponent from './form-identification';
import FormLoginComponent from './form-login';
import FormRegisterComponent from './form-register';
import MyTripDetails from './my-trip-details';
import Skeleton from './skeleton';

type Props = {
  roomTypeId: number;
};

export default function DetailsComponent({ roomTypeId }: Props) {
  const { t } = useTranslation();
  const { isError, isLoading, data: property } = usePropertyQuery();
  const {
    isError: roomError,
    isLoading: roomLoading,
    data: room,
  } = useRoomTypeQuery(roomTypeId);
  const { session } = useSessionStore();
  const searchParams = useSearchParams();
  const action = searchParams.get(ACTION)?.replace('?', '');

  const actionAuth = action === QUERY.AUTH || !action; // default action
  const actionLogin = action === QUERY.LOGIN;
  const actionRegister = action === QUERY.REGISTER;
  const actionForgot = action === QUERY.FORGOT;
  const actionIdentification = action === QUERY.IDENTIFICATION;

  // Redirect to payment page if session is available
  useEffect(() => {
    if (session) {
      setTimeout(() => {
        redirect(window.location.pathname.replace('details', 'payment'));
      }, 100);
    }
  }, [session]);

  if (isLoading || roomLoading) {
    return <Skeleton />;
  }

  if (isError || roomError) {
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
              {actionAuth && <FormAuthComponent roomTypeId={roomTypeId} />}
              {actionLogin && <FormLoginComponent roomTypeId={roomTypeId} />}
              {actionRegister && (
                <FormRegisterComponent roomTypeId={roomTypeId} />
              )}
              {actionForgot && <FormForgotComponent roomTypeId={roomTypeId} />}
              {actionIdentification && (
                <FormIdentificationComponent
                  roomTypeId={roomTypeId}
                  email={searchParams.get('email')}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
