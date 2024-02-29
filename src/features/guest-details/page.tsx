/* eslint-disable simple-import-sort/imports */
'use client';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';
import { usePropertyQuery, useRoomTypeQuery } from '@/queries';

import BackButton from '@/components/common/back-button';

import { ACTION, QUERY } from '@/constants';

import MyTripDetails from '@/features/guest-details/my-trip-details';
import { useSessionStore } from '@/store';
import { redirect, useSearchParams } from 'next/navigation';
import FormAuthComponent from './form-auth';
import FormForgotComponent from './form-forgot';
import FormLoginComponent from './form-login';
import FormRegisterComponent from './form-register';
import GuestSkeletonComponent from './guest-skeleton';

type Props = {
  roomTypeId: number;
};

const Container = tw.div`
`;

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

  const actionAuth = action === QUERY.AUTH || !action;
  const actionLogin = action === QUERY.LOGIN;
  const actionRegister = action === QUERY.REGISTER;
  const actionForgot = action === QUERY.FORGOT;

  if (session) {
    redirect(window.location.pathname.replace('details', 'payment'));
  }

  if (isLoading || roomLoading) {
    return <GuestSkeletonComponent />;
  }

  if (isError || roomError) {
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
              {actionLogin && <FormLoginComponent roomTypeId={roomTypeId} />}
              {actionAuth && <FormAuthComponent roomTypeId={roomTypeId} />}
              {actionRegister && (
                <FormRegisterComponent roomTypeId={roomTypeId} />
              )}
              {actionForgot && <FormForgotComponent roomTypeId={roomTypeId} />}
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}
