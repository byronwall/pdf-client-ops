// Define the type for a PDF Page (or a draggable image)
"use client";
import { Draggable } from "react-beautiful-dnd";

import { type PDFList } from "~/stores/useImportStore";

import { PDFPageComponent } from "./PDFPageComponent";
import { StrictModeDroppable } from "./StrictModeDroppable";

export const PDFListComponent: React.FC<{ list: PDFList }> = ({ list }) => {
  return (
    <StrictModeDroppable droppableId={list.id} direction="horizontal">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-1 gap-4 overflow-x-auto border border-blue-600 bg-gray-200 p-4"
        >
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
      )}
    </StrictModeDroppable>
  );
};
