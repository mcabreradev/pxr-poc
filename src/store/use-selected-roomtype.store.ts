import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

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
  options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const useSelectedRoomtypeStore = create<State & Actions, []>(
  (persist as Persist)(
    (set, get): State & Actions => ({
      selectedRoom: {},

      setSelectedRoomtype: (selectedRoom: SelectedRoomtype) =>
        set(() => ({
          selectedRoom: { ...get().selectedRoom, ...selectedRoom },
        })),

      resetSelectedRoomtype: () => set(() => ({ selectedRoom: {} })),
    }),
    {
      name: 'selectedRoomtype',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useSelectedRoomtypeStore;
