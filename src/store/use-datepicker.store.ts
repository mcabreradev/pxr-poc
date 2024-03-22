import { create, StateCreator } from 'zustand';
import {
  devtools,
  PersistOptions,
  subscribeWithSelector,
} from 'zustand/middleware';

type State = {
  isDatepickerOpen?: boolean | undefined;
  isClearCalendar?: boolean | undefined;
  isCalendarOpen?: boolean | undefined;
  isGuestFormOpen?: boolean | undefined;
};

const innitalState = {
  isDatepickerOpen: false,
  isClearCalendar: false,
  isCalendarOpen: false,
  isGuestFormOpen: false,
};

type Actions = {
  resetDatepickerStore: () => void;
  openDatepickerDrawer: () => void;
  closeDatepickerDrawer: () => void;
  openCalendarDrawer?: () => void;
  openGuestFormDrawer?: () => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) => devtools(subscribeWithSelector(f));

const useDatepickerStore = create<State & Actions, []>(
  (middlewares as Persist)((set): State & Actions => ({
    ...innitalState,

    resetDatepickerStore: () =>
      set(() => ({
        ...innitalState,
      })),

    openDatepickerDrawer: () =>
      set(() => ({
        isDatepickerOpen: true,
      })),

    closeDatepickerDrawer: () =>
      set(() => ({
        ...innitalState,
      })),

    openCalendarDrawer: () => {
      set(() => ({
        isDatepickerOpen: true,
        isCalendarOpen: true,
      }));
    },

    openGuestFormDrawer: () => {
      set(() => ({
        isDatepickerOpen: true,
        isGuestFormOpen: true,
      }));
    },
  })),
);

export default useDatepickerStore;
