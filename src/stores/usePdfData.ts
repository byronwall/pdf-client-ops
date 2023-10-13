import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min";
import { create } from "zustand";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export type PDFPage = {
  id: string;
  imageData: string;
  originalPageNumber: number;
};

export type PDFList = {
  id: string;
  pages: PDFPage[];
};

type ImportStore = {
  pdfLists: PDFList[];

  pdfBase64?: string;
  pdfBuffer?: ArrayBuffer;

  isLoadingThumbnail: boolean;
  isDoingExtraction: boolean;

  setOriginalList: (pdfBase64: string) => void;
  setPdfLists: (pdfList: PDFList[]) => void;

  downloadAllPdfs: () => void;
  downloadSinglePdf: (listId: string) => void;

  addBlankPDF: () => void; // Method to add a blank PDF
  resetToOriginal: () => void; // Method to reset to the original state
  clearAll: () => void;

  splitEveryPageIntoOwnPdf: () => void;

  removeSingleList: (id: string) => void;

  changeNameOfList: (id: string, newName: string) => void;
};

export const usePdfData = create<ImportStore>((set, get) => ({
  pdfLists: [],
  pdfBuffer: undefined,

  isLoadingThumbnail: false,
  isDoingExtraction: false,

  setOriginalList: async (pdfBase64) => {
    // add one blank list to the end

    const originalPdf: PDFList = {
      id: "original",
      pages: [],
    };

    // create  a buffer from the base64 string
    const pdfBuffer = Buffer.from(pdfBase64, "base64");

    set({
      pdfBuffer,
      pdfBase64,
      isLoadingThumbnail: true,
      pdfLists: [originalPdf],
    });

    // Load PDF with PDF.js
    const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;

    // Loop through each page
    const numPages = pdf.numPages;
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);

      // Prepare canvas using PDF page dimensions
      const canvas = document.createElement("canvas");
      const viewport = page.getViewport({ scale: 0.5 }); // scale to 20% for thumbnail

      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // get base 64 string from canvas
      const base64StringFromCanvas = canvas.toDataURL("image/png");

      originalPdf.pages.push({
        id: "page" + i.toString(),
        originalPageNumber: i - 1,
        imageData: base64StringFromCanvas,
      });

      set({
        pdfLists: [originalPdf],
      });
    }

    return set({
      pdfLists: [
        originalPdf,
        {
          id: "extract1",
          pages: [],
        },
      ],
      isLoadingThumbnail: false,
    });
  },

  setPdfLists: (pdfLists) => {
    return set({ pdfLists });
  },

  downloadAllPdfs: async () => {
    const { pdfBase64, pdfLists } = get();

    if (!pdfBase64) return;

    set({ isDoingExtraction: true });

    // Load the PDF into a PDFDocument object
    const originalPdfDoc = await PDFDocument.load(pdfBase64);

    // run through the pdfLists and create document based on originalPageNumber

    const newPdfs = pdfLists.filter((pdfList) => pdfList.id !== "original");

    let count = 0;

    for (const pdfList of newPdfs) {
      await createPdfFromList(pdfList, originalPdfDoc);

      // pause every 10 pdfs
      if (++count >= 10) {
        await pause(1000);
        count = 0;
      }
    }

    set({ isDoingExtraction: false });
  },

  downloadSinglePdf: async (listId) => {
    const { pdfBase64, pdfLists } = get();

    if (!pdfBase64) return;

    set({ isDoingExtraction: true });

    // Load the PDF into a PDFDocument object
    const originalPdfDoc = await PDFDocument.load(pdfBase64);

    // run through the pdfLists and create document based on originalPageNumber

    const newPdf = pdfLists.find((pdfList) => pdfList.id === listId);

    if (!newPdf) return;

    await createPdfFromList(newPdf, originalPdfDoc);

    set({ isDoingExtraction: false });
  },

  addBlankPDF: () => {
    const { pdfLists } = get();

    const newPdfList: PDFList = {
      id: "extract" + (pdfLists.length + 1).toString(),
      pages: [],
    };

    set({ pdfLists: [...pdfLists, newPdfList] });
  },
  clearAll: () => {
    set({
      pdfLists: [],
      pdfBase64: undefined,
      pdfBuffer: undefined,
      isLoadingThumbnail: false,
      isDoingExtraction: false,
    });
  },

  resetToOriginal: () => {
    const { pdfBase64 } = get();

    if (!pdfBase64) return;

    set({ pdfLists: [] });

    return get().setOriginalList(pdfBase64);
  },
  changeNameOfList: (id, newName) => {
    const { pdfLists } = get();

    const newList = pdfLists.map((pdfList) => {
      if (pdfList.id === id) {
        return { ...pdfList, id: newName };
      }
      return pdfList;
    });

    set({ pdfLists: newList });
  },
  splitEveryPageIntoOwnPdf: () => {
    const { pdfLists } = get();

    const newPdfLists = [...pdfLists];

    const newBaseName = prompt("Enter a base name for the new PDFs");

    if (!newBaseName) return;

    // find the original pdf
    const originalPdf = pdfLists.find((pdfList) => pdfList.id === "original");

    if (!originalPdf) return;

    originalPdf.pages.forEach((page) => {
      const newPdfList: PDFList = {
        id: newBaseName + " page" + (page.originalPageNumber + 1).toString(),
        pages: [page],
      };

      newPdfLists.push(newPdfList);
    });

    // remove the original pdf pages

    originalPdf.pages = [];

    set({ pdfLists: newPdfLists });
  },

  removeSingleList: (id) => {
    const { pdfLists } = get();

    const newPdfLists = pdfLists.filter((pdfList) => pdfList.id !== id);

    set({ pdfLists: newPdfLists });
  },
}));

async function createPdfFromList(
  pdfList: PDFList,
  originalPdfDoc: PDFDocument
) {
  // Create a new PDFDocument
  const newPdfDoc = await PDFDocument.create();

  const pagesToCopy = pdfList.pages.map((page) => page.originalPageNumber);

  const copiedPages = await newPdfDoc.copyPages(originalPdfDoc, pagesToCopy);

  copiedPages.forEach((page) => newPdfDoc.addPage(page));

  // Serialize to bytes and create Blob
  const pdfBytes = await newPdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  // Generate a download link for the new PDF
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = pdfList.id + ".pdf";
  link.click();
}

function pause(msec: number) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, msec || 1000);
  });
}
