import { create } from 'zustand';

type User = {
  sub: string;
  email: string;
  family_name?: string;
  given_name?: string;
  email_verified: string;
};

type UserStore = {
  user: User | null;
  addUser: (u: User | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  addUser: (u: User | null) => set(() => ({ user: u })),
}));

export default useUserStore;
