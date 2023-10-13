"use client";

import { DragDropContext } from "react-beautiful-dnd";

import { Button } from "~/components/ui/button";
import { usePdfData } from "~/stores/usePdfData";

import { PDFListComponent } from "./PDFListComponent";
import { usePdfDragHandler } from "./usePdfDragHandler";

export function PdfMgr() {
  const pdfLists = usePdfData((s) => s.pdfLists);

  const doExtraction = usePdfData((s) => s.downloadAllPdfs);
  const addBlankPdf = usePdfData((s) => s.addBlankPDF);
  const resetToOriginal = usePdfData((s) => s.resetToOriginal);
  const clearAll = usePdfData((s) => s.clearAll);
  const splitEveryPageIntoOwnPdf = usePdfData(
    (s) => s.splitEveryPageIntoOwnPdf
  );

  const onDragEnd = usePdfDragHandler();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-2">
        <Button onClick={doExtraction}>Download all new PDFs</Button>
        <Button onClick={addBlankPdf}>Add blank PDF</Button>
        <Button onClick={resetToOriginal}>Reset to original</Button>
        <Button onClick={clearAll}>Clear all</Button>
        <Button onClick={splitEveryPageIntoOwnPdf}>
          Split every page into own PDF
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {pdfLists.map((list) => (
          <PDFListComponent key={list.id} list={list} />
        ))}
      </div>
    </DragDropContext>
  );
}
