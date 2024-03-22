/* eslint-disable unused-imports/no-unused-vars */
'use client';

/* eslint-disable simple-import-sort/imports */
import { motion } from 'framer-motion';
import { redirect, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useLocale } from '@/hooks';
import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';

import {
  useSelectedRoomtypeStore,
  useSessionStore,
  useUserStore,
} from '@/store';
import useReservationRequestStore from '@/store/use-reservation-request.store';

import NotConnected from '@/app/not-connected';
import {
  ERRORS,
  RESERVATION_PROCESS_STATE,
  RESERVATION_REG_STATUS,
  RESERVATION_SALES_CHANNEL_TYPE,
  RESERVATION_SALES_ORIGIN_TYPE,
  RESERVATION_STATUS,
} from '@/constants';
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
  const [requestSetupError, setRequestSetupError] = useState(false);
  const [forbidFurtherCalls, setForbidFurtherCalls] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { error, isError, isLoading, data: property } = usePropertyQuery();
  const {
    isError: roomError,
    isLoading: roomLoading,
    data: room,
  } = useRoomTypeQuery(roomTypeId);
  const { setReservationRequest, setReservationRequestId, reservationRequest } =
    useReservationRequestStore();
  const { session } = useSessionStore();
  const { reservation } = useReservationStore();
  const { selectedRoom } = useSelectedRoomtypeStore();
  const { getAdults, getCheckin, getCheckout, getChildrens, getInfants } =
    useSearchParamOrStore();
  const { language } = useLocale();
  const {
    mutate,
    data: reservationRequestResponse,
    isError: reservationRequestError,
  } = useReservationRequestMutation();

  // eslint-disable-next-line unused-imports/no-unused-vars
  const { setLoginEnabled, user } = useUserStore();

  const abandonReservationAndGoBack = async (event) => {
    event.preventDefault();
    mutate({
      ...reservationRequest,
      process_state: RESERVATION_PROCESS_STATE.ABANDONED,
    });
    router.push(`/room-type/${roomTypeId}${window.location.search}`);
  };

  const prepareReservationRequest = useCallback(() => {
    // For now, one reservation == one room. Let's avoid edge cases before wednesday
    // You would need some additional logic to split the reservation in multiple physical rooms
    if (
      session &&
      selectedRoom.ratesPlan &&
      reservation.checkin &&
      reservation.checkout
    ) {
      const room_type: ReservedRoom = {
        har_in: reservation.checkin,
        har_out: reservation.checkout,
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
        sales_channel_type: RESERVATION_SALES_CHANNEL_TYPE,
        process_state: RESERVATION_PROCESS_STATE.WAITING_FOR_PAYMENT,
        date_in: new Date(reservation.checkin)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        date_out: new Date(reservation.checkout)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        mon_iso: 'EUR',
        total_cost: reservation.totalCost,
        room_types_cost: 0,
        guest_mon_iso: 'EUR',
        commission_mon_iso: 'EUR',
        is_default_commission: 0,
        reservation_status: RESERVATION_STATUS.WO_PAYMENT,
        room_types: [room_type],
        extras: [],
        coupons: [],
        adults_amount: getAdults(),
        additional_field_values: [],
        reg_status: RESERVATION_REG_STATUS,
        sales_origin_type: RESERVATION_SALES_ORIGIN_TYPE,
        send_confirmed_email: 1,
        confirmed_email_active: 1,
        thank_you_email_to_pax_active: 1,
        send_payment_email: 1,
        new_booking_email_send_to_hotel: 1,
        confirmed_agreement: 0,
        guest_preferred_language: language.toLowerCase(),
        guest_email: session?.email,
        guest_country_code: property.countryISO, // For now, later use country detected in IP
      };
      setReservationRequest(reservationRequest);
    } else {
      setRequestSetupError(true);
    }
  }, [
    getAdults,
    getChildrens,
    getInfants,
    language,
    property.countryISO,
    property.id,
    reservation.checkin,
    reservation.checkout,
    reservation.totalCost,
    selectedRoom.id,
    selectedRoom.ratesPlan,
    session,
    setReservationRequest,
  ]);

  // useEffect(() => {
  //   setLoginEnabled(false);

  //   return () => {
  //     setLoginEnabled(true);
  //   };
  // }, [setLoginEnabled]);

  useEffect(() => {
    // console.log("VERIFY")
    // console.log(reservationRequest.property_id == 0)
    if (reservationRequest.property_id == 0) {
      prepareReservationRequest();
    }
  }, [prepareReservationRequest, reservationRequest.property_id]);

  useEffect(() => {
    // console.log('USE EFFECT');
    if (
      !reservationRequest.id &&
      !forbidFurtherCalls &&
      reservationRequest.property_id != 0
    ) {
      // console.log("PLEASE DONT PRINT THIS TWICE")
      // console.log(reservationRequest)
      mutate({ ...reservationRequest, payment_id: undefined });
      setForbidFurtherCalls(true);
    }
  }, [reservationRequest, mutate, forbidFurtherCalls]);

  useEffect(() => {
    // console.log('HERE IS THE FIRST RESPONSE');
    // console.log(reservationRequestResponse);
    if (reservationRequestResponse != undefined && !requestSetupError) {
      if (reservationRequestResponse.res.code == 0) {
        setReservationRequestId(
          reservationRequestResponse.res.data.reservation_request_id,
        );
      } else {
        redirect(
          `/room-type/${selectedRoom.id}?checkin=${reservation.checkin}&checkout=${reservation.checkout}&totalAdults=${getAdults()}&totalChildren=${getChildrens()}&totalInfants=${getInfants}&unavailable=true`,
        );
      }
    }
  }, [
    getAdults,
    getChildrens,
    getInfants,
    reservation.checkin,
    reservation.checkout,
    reservationRequestResponse,
    requestSetupError,
    selectedRoom.id,
    setReservationRequestId,
  ]);

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
      <BackButton
        href={`/room-type/${roomTypeId}`}
        onClick={abandonReservationAndGoBack}
      >
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
