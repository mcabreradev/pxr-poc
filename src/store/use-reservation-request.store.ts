import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
  subscribeWithSelector,
} from 'zustand/middleware';

import {
  RESERVATION_PROCESS_STATE,
  RESERVATION_REG_STATUS,
  RESERVATION_SALES_CHANNEL_TYPE,
  RESERVATION_SALES_ORIGIN_TYPE,
  RESERVATION_STATUS,
} from '@/constants';

import { ReservationData, ReservationRequest } from '@/types';

type State = {
  reservationRequest: ReservationRequest;
};

const initialReservationRequestState: ReservationRequest = {
  property_id: 0,
  guest_id: 0,
  sales_channel_type: RESERVATION_SALES_CHANNEL_TYPE,
  process_state: RESERVATION_PROCESS_STATE.WAITING_FOR_PAYMENT,
  date_in: '',
  date_out: '',
  mon_iso: '',
  total_cost: 0,
  room_types_cost: 0,
  guest_mon_iso: '',
  commission_mon_iso: '',
  is_default_commission: 0,
  reservation_status: RESERVATION_STATUS.WO_PAYMENT,
  room_types: [],
  extras: [],
  coupons: [],
  adults_amount: 0,
  additional_field_values: '',
  reg_status: RESERVATION_REG_STATUS,
  sales_origin_type: RESERVATION_SALES_ORIGIN_TYPE,
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
  setPaymentId: (id: number) => void;
  completeReservationRequestData: () => void;
  setReservationData: (data: ReservationData) => void;
  resetStore: () => void;
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
    setPaymentId: (id: number) =>
      set(() => ({
        reservationRequest: {
          ...get().reservationRequest,
          payment_id: id,
        },
      })),
    completeReservationRequestData: () =>
      set(() => ({
        reservationRequest: {
          ...get().reservationRequest,
          confirmed_agreement: 1,
          reservation_status: RESERVATION_STATUS.PAID,
          process_state: RESERVATION_PROCESS_STATE.SUCCESS_PAYMENT,
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
    resetStore: () =>
      set(() => ({
        reservationRequest: {
          ...initialReservationRequestState,
        },
      })),
  })),
);

export default useReservationRequestStore;
