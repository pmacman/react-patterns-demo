import { create } from 'zustand';

type NameState = {
  name: string;
  setName: (name: string) => void;
};

export const useNameStore = create<NameState>()((set) => ({
  name: '',
  setName: (name) => set({ name }),
}));
