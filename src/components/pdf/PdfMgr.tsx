"use client";

import { DragDropContext } from "react-beautiful-dnd";

import { Button } from "~/components/ui/button";
import { usePdfData } from "~/stores/usePdfData";

import { PDFListComponent } from "./PDFListComponent";
import { usePdfDragHandler } from "./usePdfDragHandler";

export function PdfMgr() {
  const pdfLists = usePdfData((s) => s.pdfLists);

  const doExtraction = usePdfData((s) => s.doExtraction);

  const onDragEnd = usePdfDragHandler();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Button onClick={doExtraction}>Create PDFs</Button>
      <div className="flex flex-col gap-4">
        {pdfLists.map((list) => (
          <PDFListComponent key={list.id} list={list} />
        ))}
      </div>
    </DragDropContext>
  );
}
