import { create, StateCreator } from 'zustand';
import {
  devtools,
  persist,
  PersistOptions,
  subscribeWithSelector,
} from 'zustand/middleware';

type State = {
  isOpenDatepickerDrawer?: boolean | undefined;
  isClearCalendar?: boolean | undefined;
  gallery?: {
    isIntersecting?: boolean;
  };
  guestForm?: {
    isIntersecting?: boolean;
  };
};

const innitalState = {
  isOpenDatepickerDrawer: false,
  isClearCalendar: false,
  gallery: {
    isIntersecting: false,
  },
  guestForm: {
    isIntersecting: false,
  },
  roomSelection: {
    isIntersecting: false,
  },
};

type Actions = {
  openDatepickerDrawer: () => void;
  closeDatepickerDrawer: () => void;
  resetCalendar: () => void;
  setGalleryIntersecting: (isIntersecting: boolean) => void;
  setGuestFormIntersecting: (isIntersecting: boolean) => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    subscribeWithSelector(
      persist(f, {
        name: 'store-global',
      }),
    ),
  );

const useGlobalStore = create<State & Actions, []>(
  (middlewares as Persist)((set, get): State & Actions => ({
    ...innitalState,

    openDatepickerDrawer: () =>
      set(() => ({
        isOpenDatepickerDrawer: true,
      })),

    closeDatepickerDrawer: () =>
      set(() => ({
        isOpenDatepickerDrawer: false,
      })),

    resetCalendar: () =>
      set(() => ({
        isClearCalendar: true,
      })),

    setGalleryIntersecting: (isIntersecting: boolean) => {
      set(() => ({
        gallery: {
          ...get().gallery,
          isIntersecting,
        },
      }));
    },

    setGuestFormIntersecting(isIntersecting: boolean) {
      set(() => ({
        guestForm: {
          ...get().guestForm,
          isIntersecting,
        },
      }));
    },
  })),
);

export default useGlobalStore;
