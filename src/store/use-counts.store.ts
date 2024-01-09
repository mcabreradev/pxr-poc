import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  count: number;
};

type Actions = {
  inc: () => void;
  dec: () => void;
  remove: () => void;
};

const useCount = create<State & Actions>()(
  devtools((set, get) => ({
    count: 0,
    inc: () => set(() => ({ count: get().count + 1 })),
    dec: () => set(() => ({ count: get().count - 1 })),
    remove: () => set({ count: 0 }),
  })),
);

export default useCount;
