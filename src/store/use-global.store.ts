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
};

type Actions = {
  openDatepickerDrawer: () => void;
  closeDatepickerDrawer: () => void;
  resetCalendar: () => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    subscribeWithSelector(
      persist(f, {
        name: 'global-store',
      }),
    ),
  );

const useGlobalStore = create<State & Actions, []>(
  (middlewares as Persist)((set): State & Actions => ({
    isOpenDatepickerDrawer: false,
    isClearCalendar: false,

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
  })),
);

export default useGlobalStore;
