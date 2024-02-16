import { create } from 'zustand';

import { PLAN_NONBREAKFAST, PLAN_NONREFUNDABLE } from '@/constants';

export type Reservation = {
  checkin?: string | Date | null;
  checkout?: string | Date | null;
  adults?: number | null;
  childrens?: number | null;
  infants?: number | null;
  plan?: string | null;
  extra?: string | null;
  planCost?: number | null;
  totalCost?: number | null;
  taxes?: number | null;
  extraCost?: number | null;
  cancelationCost?: number | null;
  total?: number | null;
  hasBreakfast?: boolean | null;
};

type State = {
  reservation: Reservation;
};

const initialReservationState: Reservation = {
  checkin: null,
  checkout: null,
  adults: null,
  childrens: null,
  infants: null,
  plan: PLAN_NONREFUNDABLE,
  extra: PLAN_NONBREAKFAST,
  planCost: null,
  totalCost: null,
  taxes: null,
  extraCost: null,
  cancelationCost: null,
  total: null,
  hasBreakfast: null,
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

const useReservationQueryStore = create<State & Actions>((set, get) => ({
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

  resetReservation: () => set(() => ({ reservation: initialReservationState })),
}));

export default useReservationQueryStore;
