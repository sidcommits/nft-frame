import { create } from 'zustand';

interface NftData { address: string | null; tokenID: number | null; imageUrl?: string; }

interface UserStore {
  activeStep: number;
  displayId: string | null;
  displayOccupied: boolean;
  nftData: NftData;
  collectionSelected: string;
  time: number;
  rent: string;
  setActiveStep: (step: number) => void;
  setDisplayId: (id: string | null) => void;
  setDisplayOccupied: (v: boolean) => void;
  setNftData: (data: NftData) => void;
  setCollectionSelected: (col: string) => void;
  setTime: (t: number) => void;
  setRent: (r: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  activeStep: 0,
  displayId: null,
  displayOccupied: false,
  nftData: { address: null, tokenID: null },
  collectionSelected: '',
  time: 10,
  rent: '0',
  setActiveStep: (activeStep) => set({ activeStep }),
  setDisplayId: (displayId) => set({ displayId }),
  setDisplayOccupied: (displayOccupied) => set({ displayOccupied }),
  setNftData: (nftData) => set({ nftData }),
  setCollectionSelected: (collectionSelected) => set({ collectionSelected }),
  setTime: (time) => set({ time }),
  setRent: (rent) => set({ rent }),
}));
