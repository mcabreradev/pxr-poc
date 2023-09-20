import { create } from 'zustand';

type State = {
  templateTitle?: string | null;
  description?: string | null;
};

type Actions = {
  setSeoTitle: (title: string) => void;
  setSeoDescription: (title: string) => void;

  remove: () => void;
};

const initalState: State = {
  templateTitle: null,
  description: null,
};

const useSeo = create<State & Actions>((set) => ({
  ...initalState,

  setSeoTitle: (title: string) => {
    set(() => ({ templateTitle: title }));
  },

  setSeoDescription: (title: string) => {
    set(() => ({ description: title }));
  },

  remove: () => set(initalState),
}));

export default useSeo;
