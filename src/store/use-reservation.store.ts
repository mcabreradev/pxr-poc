import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

type Reservation = {
  checkin?: string | Date | null;
  checkout?: string | Date | null;
  adults?: number | null;
  childrens?: number | null;
  infants?: number | null;
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

// const useReservationStore = create<State & Actions>((set, get) => ({
//   reservation: { ...initialReservationState },

//   setReservation: (r: Reservation) =>
//     set(() => ({ reservation: { ...get().reservation, ...r } })),

//   setCheckin: (c: string | Date | null) =>
//     set(() => ({ reservation: { ...get().reservation, checkin: c } })),

//   setCheckout: (c: string | Date | null) =>
//     set(() => ({ reservation: { ...get().reservation, checkout: c } })),

//   setAdults: (a: number | null) =>
//     set(() => ({ reservation: { ...get().reservation, adults: a } })),

//   setChildrens: (c: number | null) =>
//     set(() => ({ reservation: { ...get().reservation, childrens: c } })),

//   setInfants: (i: number | null) =>
//     set(() => ({ reservation: { ...get().reservation, infants: i } })),

//   resetReservation: () => set(() => ({ reservation: initialReservationState })),
// }));

type Persist = (
  config: StateCreator<State & Actions>,
  options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const useReservationStore = create<State & Actions, []>(
  (persist as Persist)(
    (set, get): State & Actions => ({
      reservation: { ...initialReservationState },

      setReservation: (r: Reservation) =>
        set(() => ({ reservation: { ...get().reservation, ...r } })),

      setCheckin: (c: string | Date | null) =>
        set(() => ({ reservation: { ...get().reservation, checkin: c } })),

      setCheckout: (c: string | Date | null) =>
        set(() => ({ reservation: { ...get().reservation, checkout: c } })),

      setAdults: (a: number | null) =>
        set(() => ({ reservation: { ...get().reservation, adults: a } })),

      setChildrens: (c: number | null) =>
        set(() => ({ reservation: { ...get().reservation, childrens: c } })),

      setInfants: (i: number | null) =>
        set(() => ({ reservation: { ...get().reservation, infants: i } })),

      resetReservation: () =>
        set(() => ({ reservation: initialReservationState })),
    }),
    {
      name: 'reservation',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useReservationStore;
