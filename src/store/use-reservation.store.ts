import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
  subscribeWithSelector,
} from 'zustand/middleware';

import { TOTAL_ADULTS_DEFAULT } from '@/constants';

import { Reservation } from '@/types';

type State = {
  reservation: Reservation;
};

const initialReservationState: Reservation = {
  checkin: null,
  checkout: null,
  adults: TOTAL_ADULTS_DEFAULT,
  childrens: 0,
  infants: 0,
  plan: null,
  extra: null,
  planCost: null,
  totalCost: null,
  taxes: null,
  extraCost: null,
  cancelationCost: null,
  total: null,
  hasBreakfast: null,
  selectedRoom: {},
  product: {},
};

type Actions = {
  setReservation: (u: Reservation) => void;
  getReservationBy: (s: keyof Reservation) => void;
  resetReservation: () => void;
  setCheckin: (c: string) => void;
  setCheckout: (c: string) => void;
  setAdults: (a: number) => void;
  setChildrens: (c: number) => void;
  setInfants: (i: number) => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    subscribeWithSelector(
      persist(f, {
        name: 'store-reservation',
        storage: createJSONStorage(() => localStorage),
      }),
    ),
  );

const useReservationStore = create<State & Actions, []>(
  (middlewares as Persist)((set, get): State & Actions => ({
    reservation: { ...initialReservationState },

    setReservation: (reservation: Reservation) =>
      set(() => ({ reservation: { ...get().reservation, ...reservation } })),

    getReservationBy: (s: keyof Reservation) => {
      const reservation = get().reservation as Reservation;
      reservation[s as keyof Reservation];
    },

    setCheckin: (checkin: string | Date | null) =>
      set(() => ({ reservation: { ...get().reservation, checkin } })),

    setCheckout: (checkout: string | Date | null) =>
      set(() => ({ reservation: { ...get().reservation, checkout } })),

    setAdults: (adults: number) =>
      set(() => ({ reservation: { ...get().reservation, adults } })),

    setChildrens: (childrens: number) =>
      set(() => ({ reservation: { ...get().reservation, childrens } })),

    setInfants: (infants: number) =>
      set(() => ({ reservation: { ...get().reservation, infants } })),

    resetReservation: () =>
      set(() => ({ reservation: initialReservationState })),
  })),
);

export default useReservationStore;
