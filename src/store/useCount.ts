import { create } from 'zustand';

type StoreType = {
  count: number;
  inc: () => void;
  dec: () => void;
  remove: () => void;
};

const useCount = create<StoreType>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
  remove: () => set({ count: 0 }),
}));

export default useCount;
