"use client";

import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

import { useCallback } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { cn } from "~/lib/utils";
import { type PDFList, usePdfData } from "~/stores/useImportStore";

type Props = {
  className?: string;

  children: React.ReactNode;
};

export function FileDropzone({ children, className }: Props) {
  // bring over the hooks

  const setOriginalList = usePdfData((s) => s.setOriginalList);

  const onDropRaw: DropzoneOptions["onDrop"] = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const result = reader.result;

      if (typeof result !== "string") return;

      const base64String = result.split(",")[1];

      if (!base64String) return;

      const originalPdf: PDFList = {
        id: "original",
        pages: [],
      };

      // create  a buffer from the base64 string
      const pdfBuffer = Buffer.from(base64String, "base64");

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
          originalPageNumber: i,
          imageData: base64StringFromCanvas,
        });

        setOriginalList(originalPdf);
      }

      // process PDF and update global state
    };

    reader.readAsDataURL(file);
  };

  const onDrop = useCallback(onDropRaw, [setOriginalList]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noDragEventsBubbling: true,
  });

  return (
    <div className={cn({ "ring-2 ring-primary": isDragActive }, className)}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {children}
      </div>
    </div>
  );
}
