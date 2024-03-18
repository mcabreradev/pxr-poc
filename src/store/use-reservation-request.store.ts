import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
  subscribeWithSelector,
} from 'zustand/middleware';

import {
  RemainingReservationRequestData,
  ReservationData,
  ReservationRequest,
} from '@/types';

type State = {
  reservationRequest: ReservationRequest;
};

const initialReservationRequestState: ReservationRequest = {
  property_id: 0,
  guest_id: 0,
  sales_channel_type: 'web',
  process_state: 'WAITING_FOR_PAYMENT',
  date_in: '',
  date_out: '',
  mon_id: 0,
  mon_iso: '',
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
  adults_amount: 0,
  additional_field_values: '',
  reg_status: 'active',
  sales_origin_type: 'DIRECT',
  send_confirmed_email: 1,
  confirmed_email_active: 1,
  thank_you_email_to_pax_active: 1,
  send_payment_email: 1,
  new_booking_email_send_to_hotel: 1,
  confirmed_agreement: 0,
};

type Actions = {
  setReservationRequest: (u: ReservationRequest) => void;
  setReservationRequestId: (id: number) => void;
  completeReservationRequestData: (
    data: RemainingReservationRequestData,
  ) => void;
  setReservationData: (data: ReservationData) => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    subscribeWithSelector(
      persist(f, {
        name: 'store-reservation-request',
        storage: createJSONStorage(() => localStorage),
      }),
    ),
  );

const useReservationRequestStore = create<State & Actions, []>(
  (middlewares as Persist)((set, get): State & Actions => ({
    reservationRequest: { ...initialReservationRequestState },
    setReservationRequest: (reservationRequest: ReservationRequest) =>
      set(() => ({
        reservationRequest: {
          ...get().reservationRequest,
          ...reservationRequest,
        },
      })),
    setReservationRequestId: (id: number) =>
      set(() => ({
        reservationRequest: {
          ...get().reservationRequest,
          id: id,
        },
      })),
    completeReservationRequestData: (data: RemainingReservationRequestData) =>
      set(() => ({
        reservationRequest: {
          ...get().reservationRequest,
          confirmed_agreement: 1,
          payment_id: data.payment_id,
          guest_preferred_language: data.guest_preferred_language,
          guest_email: data.guest_email,
          guest_country_code: data.guest_country_code,
          process_state: 'SUCCESS_PAYMENT',
        },
      })),
    setReservationData: (data: ReservationData) =>
      set(() => ({
        reservationRequest: {
          ...get().reservationRequest,
          id_public: data.id_public,
          reservation_id: data.reservation_id,
        },
      })),
  })),
);

export default useReservationRequestStore;
