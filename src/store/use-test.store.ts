import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

type PersistStore = {
  test: unknown;
  addPersist: (u: unknown) => void;
};

type MyPersist = (
  config: StateCreator<PersistStore>,
  options: PersistOptions<PersistStore>,
) => StateCreator<PersistStore>;

const usePersistStore = create<PersistStore, []>(
  (persist as MyPersist)(
    (set): PersistStore => ({
      test: null,
      addPersist: (u: unknown) => set(() => ({ test: u })),
    }),
    {
      name: 'storage-test',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
export default usePersistStore;
