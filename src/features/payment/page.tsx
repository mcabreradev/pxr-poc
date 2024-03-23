/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
'use client';

/* eslint-disable simple-import-sort/imports */
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';

import { useSessionStore } from '@/store';
import useReservationRequestStore from '@/store/use-reservation-request.store';

import NotConnected from '@/app/not-connected';
import { ERRORS } from '@/constants';
import StripePayment from '@/features/payment/strype-payment';
import {
  useCheckGuestMutation,
  useReservationRequestMutation,
} from '@/mutations';
import { usePropertyQuery, useRoomTypeQuery } from '@/queries';

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
  const {
    mutate,
    data: reservationRequestResponse,
    isError: reservationRequestError,
  } = useReservationRequestMutation();

  const reservationRequestMutation = useReservationRequestMutation();
  const checkGuestMutation = useCheckGuestMutation();

  /**
   * Redirect to home if there is no session
   */
  if (!session) {
    redirect('/');
  }

  const {
    checkin,
    checkout,
    roomTypeId: roomType,
    propertyId,
    adults,
    childrens,
    infants,
    plan,
    currency,
    totalCost,
    total,
  } = reservation;

  const reservationRequestData = useCallback(
    (guest_id: number): ReservationRequest => {
      const room_type: ReservedRoom = {
        har_in: checkin as string,
        har_out: checkout as string,
        har_tha_id: roomType as number,
        har_pla_id: plan,
        har_hot_id: propertyId as number,
        har_adults: adults as number,
        har_children: childrens as number,
        har_infants: infants as number,
        har_seniors: 0,
        har_pax_info: '',
        har_adults_info: '',
        har_childrens_info: '',
        har_seniors_info: '',
        har_infants_info: '',
        har_cost: total, // totalCost + taxes
        har_additional_field_1: '',
        har_additional_field_2: '',
        har_additional_field_3: '',
      };

      return {
        property_id: propertyId as number,
        guest_id,
        sales_channel_type: 'web',
        process_state: 'WAITING_FOR_PAYMENT',
        date_in: checkin as string,
        date_out: checkout as string,
        mon_id: 5,
        mon_iso: currency,
        total_cost: totalCost,
        room_types_cost: 0,
        guest_mon_iso: currency,
        mon_commission_id: 5,
        commission_mon_iso: currency,
        is_default_commission: 0,
        reservation_status: 'WO_PAYMENT',
        room_types: [room_type],
        extras: [],
        coupons: [],
        adults_amount: adults as number,
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
    },
    [
      checkin,
      checkout,
      roomType,
      plan,
      propertyId,
      adults,
      childrens,
      infants,
      total,
      currency,
      totalCost,
    ],
  );

  useEffect(() => {
    const handleMutations = async () => {
      try {
        // Wait for the first mutation to complete
        const { data: guestPaxerId } = await checkGuestMutation.mutateAsync({
          guestIAMId: '',
          displayName: ``,
          lastName: '',
          firstName: '',
          acceptedTerms: true,
        });
        console.log('Guest Paxer Id:', guestPaxerId);

        // Then use the result to handle the second mutation
        const res = await reservationRequestMutation.mutateAsync(
          reservationRequestData(guestPaxerId), // Cast guestPaxerId to number
        );
        // Set the reservation request id
        setReservationRequestId(res.data.reservation_request_id);
        console.log('Reservation Request Executed', res);
      } catch (error) {
        console.error('Error handling mutations:', error);
      }
    };

    // here is where the magic happens
    setTimeout(() => {
      handleMutations();
    });
  }, [
    checkGuestMutation,
    reservationRequestData,
    reservationRequestMutation,
    session,
    setReservationRequestId,
  ]);

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
