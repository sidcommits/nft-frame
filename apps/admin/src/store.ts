import { create } from 'zustand';

interface AdminStore {
  displaysOwned: string[];
  setDisplaysOwned: (displays: string[]) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  displaysOwned: [],
  setDisplaysOwned: (displaysOwned) => set({ displaysOwned }),
}));
