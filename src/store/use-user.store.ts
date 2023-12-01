import { create } from 'zustand';

type UserStore = {
  user: unknown;
  addUser: (u: unknown) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  addUser: (u: unknown) => set(() => ({ user: u })),
}));

export default useUserStore;
