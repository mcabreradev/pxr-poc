'use client';

/* eslint-disable simple-import-sort/imports */
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';

import { useSessionStore, useUserStore } from '@/store';
import useReservationRequestStore from '@/store/use-reservation-request.store';

import NotConnected from '@/app/not-connected';
import { ERRORS, URL } from '@/constants';
import StripePayment from '@/features/payment/strype-payment';
import { usePropertyQuery, useRoomTypeQuery } from '@/queries';

import useSearchParamOrStore from '../../hooks/use-search-param-or-store';
import MyTripDetails from './my-trip-details';
import SkeletonComponent from './skeleton';

import { ReservationRequest } from '@/types';

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
  const { setLoginEnabled } = useUserStore();
  const { setReservationRequest } = useReservationRequestStore();
  const { session } = useSessionStore();
  const { getAdults, getCheckin, getCheckout } = useSearchParamOrStore();

  const actionPayment = !action;
  const actionSuccess = action === URL.SUCCESS;
  const actionError = action === URL.ERROR;

  useEffect(() => {
    setLoginEnabled(false);

    return () => {
      setLoginEnabled(true);
    };
  }, [setLoginEnabled]);

  useEffect(() => {
    if (session) {
      const reservationRequest: ReservationRequest = {
        property_id: property.id,
        guest_id: session.sub,
        sales_channel_type: 'web',
        process_state: 'WAITING_FOR_PAYMENT',
        date_in: getCheckin(),
        date_out: getCheckout(),
        mon_id: 1,
        mon_iso: 'USD',
        total_cost: 0,
        room_types_cost: 0,
        guest_mon_iso: '',
        mon_commission_id: 0,
        commission_mon_iso: '',
        is_default_commission: 0,
        reservation_status: 'WO_PAYMENT',
        room_types: [],
        extras: [],
        coupons: [],
        adults_amount: getAdults(),
        additional_fields_values: '',
        reg_status: 'active',
        sales_origin_type: 'DIRECT',
        send_confirmed_email: 1,
        confirmed_email_active: 1,
        thank_you_email_to_pax_active: 1,
        send_payment_email: 1,
        new_booking_email_send_to_hotel: 1,
        confirmed_agreement: 0,
      };
      setReservationRequest(reservationRequest);
    }
  }, [
    getAdults,
    getCheckin,
    getCheckout,
    property,
    session,
    setReservationRequest,
  ]);

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
              {actionPayment && <StripePayment roomTypeId={roomTypeId} />}
              {actionSuccess && <StripePayment roomTypeId={roomTypeId} />}
              {actionError && <StripePayment roomTypeId={roomTypeId} />}
            </section>
          </div>
        </div>
      </div>
    </Container>
  );
}
