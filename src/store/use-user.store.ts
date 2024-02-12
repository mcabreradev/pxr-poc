import { create } from 'zustand';

import { User } from '@/types';

type UserStore = {
  user: User | null;
  addUser: (u: User | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  addUser: (u: User | null) => set(() => ({ user: u })),
}));

export default useUserStore;
