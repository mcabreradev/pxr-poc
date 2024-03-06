import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
  subscribeWithSelector,
} from 'zustand/middleware';

import { SelectedRoomtype } from '@/types';

type State = {
  selectedRoom: SelectedRoomtype;
};

type Actions = {
  setSelectedRoomtype: (r: SelectedRoomtype) => void;
  resetSelectedRoomtype: () => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    subscribeWithSelector(
      persist(f, {
        name: 'store-selected-roomtype',
        storage: createJSONStorage(() => localStorage),
      }),
    ),
  );

const useSelectedRoomtypeStore = create<State & Actions>(
  (middlewares as Persist)((set, get): State & Actions => ({
    selectedRoom: {},

    setSelectedRoomtype: (selectedRoom: SelectedRoomtype) =>
      set(() => ({
        selectedRoom: { ...get().selectedRoom, ...selectedRoom },
      })),

    resetSelectedRoomtype: () => set(() => ({ selectedRoom: {} })),
  })),
);

export default useSelectedRoomtypeStore;
