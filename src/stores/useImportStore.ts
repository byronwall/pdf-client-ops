import { create } from "zustand";

export type PDFPage = {
  id: string;
  imageData: string;
  originalPageNumber: number;
};

// Define the type for a PDF List
export type PDFList = {
  id: string;
  pages: PDFPage[];
};

type ImportStore = {
  pdfLists: PDFList[];

  setOriginalList: (originalList: PDFList) => void;

  setPdfLists: (pdfList: PDFList[]) => void;
};

export const usePdfData = create<ImportStore>((set) => ({
  pdfLists: [],

  setOriginalList: (pdfList) => {
    // add one blank list to the end

    return set({
      pdfLists: [
        pdfList,
        {
          id: "extract1",
          pages: [],
        },
      ],
    });
  },

  setPdfLists: (pdfLists) => {
    return set({ pdfLists });
  },
}));
