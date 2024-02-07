import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
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
  clear: (value: boolean) => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    subscribeWithSelector(
      persist(f, {
        name: 'drawer',
        storage: createJSONStorage(() => localStorage),
      }),
    ),
  );

const useDrawerStore = create<State & Actions, []>(
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

    clear: (value: boolean) =>
      set(() => ({
        isClearCalendar: value,
      })),
  })),
);

export default useDrawerStore;
