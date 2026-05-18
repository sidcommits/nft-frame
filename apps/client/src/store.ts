import { create } from 'zustand';

interface ClientStore {
  displaySelected: string | null;
  displaysOwned: string[];
  setDisplaySelected: (id: string | null) => void;
  setDisplaysOwned: (ids: string[]) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  displaySelected: null,
  displaysOwned: [],
  setDisplaySelected: (displaySelected) => set({ displaySelected }),
  setDisplaysOwned: (displaysOwned) => set({ displaysOwned }),
}));
