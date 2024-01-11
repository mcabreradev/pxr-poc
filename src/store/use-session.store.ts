import { create, StateCreator } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  PersistOptions,
} from 'zustand/middleware';

type Session = {
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  sub?: string;
};

type State = {
  session?: Session | null;
};

type Actions = {
  setSession: (session: Session) => void;
  removeSession: () => void;
};

type Persist = (
  config: StateCreator<State & Actions>,
  options?: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

const middlewares = (f) =>
  devtools(
    persist(f, {
      name: 'session',
      storage: createJSONStorage(() => sessionStorage),
    }),
  );

const useSession = create<State & Actions>()(
  (middlewares as Persist)((set, get) => ({
    session: null,
    setSession: (session: Session) =>
      set(() => ({ session: { ...get().session, ...session } })),
    removeSession: () => set({ session: null }),
  })),
);

export default useSession;
