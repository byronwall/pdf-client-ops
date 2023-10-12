// Define the type for a PDF Page (or a draggable image)
"use client";

import Image from "next/image";

import { type PDFPage } from "~/stores/usePdfData";

export const PDFPageComponent: React.FC<{ page: PDFPage }> = ({ page }) => {
  return (
    <div className="h-44 w-44 border border-black">
      <Image
        src={page.imageData}
        alt={`Page ${page.id}`}
        width={512}
        height={512}
      />
    </div>
  );
};
