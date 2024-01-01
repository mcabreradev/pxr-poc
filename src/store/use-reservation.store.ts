import { create } from 'zustand';

import { PLAN_NONBREAKFAST, PLAN_NONREFUNDABLE } from '@/constants';

type Reservation = {
  checkin?: string | Date | null;
  checkout?: string | Date | null;
  adults?: number | null;
  childrens?: number | null;
  infants?: number | null;
  plan?: string | null;
  extra?: string | null;
};

type State = {
  reservation: Reservation | null;
};

const initialReservationState: Reservation = {
  checkin: null,
  checkout: null,
  adults: null,
  childrens: null,
  infants: null,
  plan: PLAN_NONREFUNDABLE,
  extra: PLAN_NONBREAKFAST,
};

type Actions = {
  setReservation: (u: Reservation) => void;
  resetReservation: () => void;
  setCheckin: (c: string) => void;
  setCheckout: (c: string) => void;
  setAdults: (a: number) => void;
  setChildrens: (c: number) => void;
  setInfants: (i: number) => void;
};

const useReservationStore = create<State & Actions>((set, get) => ({
  reservation: { ...initialReservationState },

  setReservation: (reservation: Reservation) =>
    set(() => ({ reservation: { ...get().reservation, ...reservation } })),

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

  resetReservation: () => set(() => ({ reservation: initialReservationState })),
}));

export default useReservationStore;
