import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
} from 'zustand/middleware';

import { Reservation } from '@/types';

type State = {
  reservation: Reservation;
};

const initialReservationState: Reservation = {
  checkin: null,
  checkout: null,
  adults: null,
  childrens: null,
  infants: null,
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
  isOpenDatepickerDrawer: false,
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
  openDatepickerDrawer: () => void;
  closeDatepickerDrawer: () => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    persist(f, {
      name: 'reservation',
      storage: createJSONStorage(() => sessionStorage),
    }),
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

    setAdults: (adults: number | null) =>
      set(() => ({ reservation: { ...get().reservation, adults } })),

    setChildrens: (childrens: number | null) =>
      set(() => ({ reservation: { ...get().reservation, childrens } })),

    setInfants: (infants: number | null) =>
      set(() => ({ reservation: { ...get().reservation, infants } })),

    resetReservation: () =>
      set(() => ({ reservation: initialReservationState })),

    openDatepickerDrawer: () =>
      set(() => ({
        reservation: { ...get().reservation, isOpenDatepickerDrawer: true },
      })),

    closeDatepickerDrawer: () =>
      set(() => ({
        reservation: { ...get().reservation, isOpenDatepickerDrawer: false },
      })),
  })),
);

export default useReservationStore;
