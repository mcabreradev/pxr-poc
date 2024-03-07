import { create } from 'zustand';

import { User } from '@/types';

type UserStore = {
  user: User | null;
  loginEnabled: boolean;
  addUser: (u: User | null) => void;
  setLoginEnabled: (value: boolean) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  loginEnabled: true,
  addUser: (u: User | null) => set(() => ({ user: u })),
  setLoginEnabled: (value: boolean) => set(() => ({ loginEnabled: value })),
}));

export default useUserStore;
