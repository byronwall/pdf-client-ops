import { create } from "zustand";

export type RawCsvData = Record<string, string>;

type ImportStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  csvContent: RawCsvData[];
  setCsvContent: (csvContent: RawCsvData[]) => void;
};

export const useImportStore = create<ImportStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),

  csvContent: [],
  setCsvContent: (csvContent: RawCsvData[]) =>
    set({ csvContent, isOpen: true }),
}));
