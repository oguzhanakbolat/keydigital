import { create } from "zustand";

export type SaveStoreType = {
  saveList: any[] | null;
  isLoading: boolean;
  listNumber: number;
  totalListNumber: number;
  name: string;
  setName: (name: string) => void;
  setSaveList: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setListNumber: (number: number) => void;
};

export const useSaveStore = create<SaveStoreType>((set) => ({
  saveList: null,
  isLoading: false,
  listNumber: 1,
  totalListNumber: 0,
  name: "",
  setName: (name: string) => set({ name }),
  setListNumber: (number: number) => set({ listNumber: number }),
  setSaveList: (data: any, name: string = "") =>
    set({
      saveList: data,
      totalListNumber: data.length,
      listNumber: 1,
      name: name,
    }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
