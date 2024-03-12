import { create, StateCreator } from 'zustand';
import {
  devtools,
  persist,
  PersistOptions,
  subscribeWithSelector,
} from 'zustand/middleware';

import { User } from '@/types';

type State = {
  user: User | null;
  loginEnabled: boolean;
};

type Actions = {
  addUser: (u: User | null) => void;
  setLoginEnabled: (value: boolean) => void;
  setAuth: (isAuth: boolean) => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    subscribeWithSelector(
      persist(f, {
        name: 'store-user',
      }),
    ),
  );

const useUserStore = create<State & Actions, []>(
  (middlewares as Persist)((set, get): State & Actions => ({
    user: null,

    loginEnabled: true,

    addUser: (u: User | null) => set(() => ({ user: u })),

    setLoginEnabled: (value: boolean) => set(() => ({ loginEnabled: value })),

    setAuth: (isAuth: boolean) =>
      set(() => ({ user: { ...get().user, isAuth } })),
  })),
);

export default useUserStore;
