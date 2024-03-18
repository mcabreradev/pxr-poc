/* eslint-disable unused-imports/no-unused-vars */
'use client';

/* eslint-disable simple-import-sort/imports */
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';

import {
  useSelectedRoomtypeStore,
  useSessionStore,
  useUserStore,
} from '@/store';
import useReservationRequestStore from '@/store/use-reservation-request.store';

import NotConnected from '@/app/not-connected';
import { ERRORS, URL } from '@/constants';
import StripePayment from '@/features/payment/strype-payment';
import { useReservationRequestMutation } from '@/mutations';
import { usePropertyQuery, useRoomTypeQuery } from '@/queries';

import useSearchParamOrStore from '../../hooks/use-search-param-or-store';
import MyTripDetails from './my-trip-details';
import SkeletonComponent from './skeleton';

import useReservationStore from '@/store/use-reservation.store';
import { ReservationRequest, ReservedRoom } from '@/types';

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
  const { setReservationRequest, setReservationRequestId } =
    useReservationRequestStore();
  const { session } = useSessionStore();
  const { reservation } = useReservationStore();
  const { selectedRoom } = useSelectedRoomtypeStore();
  const { getAdults, getCheckin, getCheckout, getChildrens, getInfants } =
    useSearchParamOrStore();
  const {
    mutate,
    data: reservationRequestResponse,
    isError: reservationRequestError,
  } = useReservationRequestMutation();

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { setLoginEnabled, user } = useUserStore();

  const actionPayment = !action;
  const actionSuccess = action === URL.SUCCESS;
  const actionError = action === URL.ERROR;

  // useEffect(() => {
  //   setLoginEnabled(false);

  //   return () => {
  //     setLoginEnabled(true);
  //   };
  // }, [setLoginEnabled]);

  useEffect(() => {
    if (session && selectedRoom.ratesPlan) {
      // For now, one reservation == one room. Let's avoid edge cases before wednesday
      // You would need some additional logic to split the reservation in multiple physical rooms
      const room_type: ReservedRoom = {
        har_in: getCheckin(),
        har_out: getCheckout(),
        har_tha_id: selectedRoom.id,
        har_pla_id: 330,
        har_hot_id: property.id,
        har_adults: getAdults(), // should change at some point
        har_children: getChildrens(),
        har_infants: getInfants(),
        har_seniors: 0,
        har_pax_info: '',
        har_adults_info: '',
        har_childrens_info: '',
        har_seniors_info: '',
        har_infants_info: '',
        har_cost: reservation.totalCost,
        har_additional_field_1: '',
        har_additional_field_2: '',
        har_additional_field_3: '',
      };
      const reservationRequest: ReservationRequest = {
        property_id: property.id,
        guest_id: 123,
        sales_channel_type: 'web',
        process_state: 'WAITING_FOR_PAYMENT',
        date_in: new Date(getCheckin())
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        date_out: new Date(getCheckout())
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        mon_id: 5,
        mon_iso: 'EUR',
        total_cost: reservation.totalCost,
        room_types_cost: 0,
        guest_mon_iso: 'EUR',
        mon_commission_id: 5,
        commission_mon_iso: 'EUR',
        is_default_commission: 0,
        reservation_status: 'WO_PAYMENT',
        room_types: [room_type],
        extras: [],
        coupons: [],
        adults_amount: getAdults(),
        additional_field_values: [],
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
      mutate(reservationRequest);
    }
  }, [
    getAdults,
    getCheckin,
    getCheckout,
    getChildrens,
    getInfants,
    mutate,
    property,
    reservation.totalCost,
    selectedRoom.id,
    selectedRoom.ratesPlan,
    selectedRoom.roomPrice?.rate,
    session,
    setReservationRequest,
  ]);

  useEffect(() => {
    if (
      reservationRequestResponse != undefined &&
      reservationRequestResponse.res.code == 0
    ) {
      setReservationRequestId(
        reservationRequestResponse.res.data.reservation_request_id,
      );
    }
  }, [reservationRequestResponse, setReservationRequestId]);

  if (!session) {
    redirect('/');
  }
  // if (!user) {
  //   redirect('/');
  // }

  if (isLoading || roomLoading) {
    return <SkeletonComponent />;
  }

  if (isError || roomError || reservationRequestError) {
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
              <StripePayment roomTypeId={roomTypeId} />

              {/* {actionPayment && <StripePayment roomTypeId={roomTypeId} />}
              {actionSuccess && <StripePayment roomTypeId={roomTypeId} />}
              {actionError && <StripePayment roomTypeId={roomTypeId} />} */}
            </section>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
