import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { SelectedRoomtype } from '@/types';

const middlewares = (f) => devtools(persist(f, { name: 'selectedRoomStore' }));

type State = {
  selectedRoom: SelectedRoomtype;
};

type Actions = {
  setSelectedRoomtype: (r: SelectedRoomtype) => void;
  resetSelectedRoomtype: () => void;
};

const useSelectedRoomtypeStore = create<State & Actions>(
  (
    middlewares as (
      config: StateCreator<State & Actions>,
    ) => StateCreator<State & Actions>
  )((set, get): State & Actions => ({
    selectedRoom: {},

    setSelectedRoomtype: (selectedRoom: SelectedRoomtype) =>
      set(() => ({
        selectedRoom: { ...get().selectedRoom, ...selectedRoom },
      })),

    resetSelectedRoomtype: () => set(() => ({ selectedRoom: {} })),
  })),
);

export default useSelectedRoomtypeStore;
