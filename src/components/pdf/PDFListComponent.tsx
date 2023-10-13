"use client";

import { Draggable } from "react-beautiful-dnd";

import { Button } from "~/components/ui/button";
import { type PDFList, usePdfData } from "~/stores/usePdfData";

import { PDFPageComponent } from "./PDFPageComponent";
import { StrictModeDroppable } from "./StrictModeDroppable";

export const PDFListComponent: React.FC<{ list: PDFList }> = ({ list }) => {
  const changeName = usePdfData((s) => s.changeNameOfList);
  const downloadSinglePdf = usePdfData((s) => s.downloadSinglePdf);
  const removeSingleList = usePdfData((s) => s.removeSingleList);

  const handleNameChange = () => {
    const newName = window.prompt("Enter a new name for this list", list.id);
    if (newName) {
      changeName(list.id, newName);
    }
  };

  return (
    <StrictModeDroppable droppableId={list.id} direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex min-h-[128px] flex-col gap-4 overflow-x-auto border border-blue-600 bg-gray-200 p-4"
        >
          <h3 className="flex items-center gap-4">
            <span
              onClick={handleNameChange}
              className="cursor-pointer hover:text-blue-600 hover:underline"
            >
              {list.id} ({list.pages.length} pages)
            </span>
            <Button onClick={() => downloadSinglePdf(list.id)}>
              Download single PDF
            </Button>
            <Button onClick={() => removeSingleList(list.id)}>Remove</Button>
          </h3>
          <div className="flex flex-1 shrink-0 gap-2">
            {list.pages.map((page, index) => (
              <Draggable key={page.id} draggableId={page.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PDFPageComponent page={page} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </StrictModeDroppable>
  );
};
