// Define the type for a PDF Page (or a draggable image)
"use client";
import { DragDropContext } from "react-beautiful-dnd";
import { usePdfData } from "~/stores/usePdfData";

export function usePdfDragHandler() {
  const pdfLists = usePdfData((s) => s.pdfLists);
  const setPdfLists = usePdfData((s) => s.setPdfLists);

  const onDragEnd: DragDropContext["props"]["onDragEnd"] = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination, do nothing
    if (!destination) {
      return;
    }

    // If the item was dropped back to its original position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find source and destination lists
    const sourceList = pdfLists.find((list) => list.id === source.droppableId);
    const destList = pdfLists.find(
      (list) => list.id === destination.droppableId
    );

    if (!sourceList || !destList) {
      return;
    }

    // Creating a new copy of pdfLists to manipulate
    const newPdfLists = [...pdfLists];

    // Case 1: Reordering in the same list
    if (source.droppableId === destination.droppableId) {
      const newPages = Array.from(sourceList.pages);
      const [movedPage] = newPages.splice(source.index, 1);

      if (!movedPage) {
        return;
      }

      newPages.splice(destination.index, 0, movedPage);
      const updatedList = {
        ...sourceList,
        pages: newPages,
      };
      const listIndex = newPdfLists.findIndex(
        (list) => list.id === sourceList.id
      );
      newPdfLists[listIndex] = updatedList;
    } else {
      // Case 2: Moving to a different list
      // Remove from source list
      const sourcePages = Array.from(sourceList.pages);

      const [movedPage] = sourcePages.splice(source.index, 1);

      if (!movedPage) {
        return;
      }

      const updatedSourceList = {
        ...sourceList,
        pages: sourcePages,
      };
      const sourceListIndex = newPdfLists.findIndex(
        (list) => list.id === sourceList.id
      );
      newPdfLists[sourceListIndex] = updatedSourceList;

      // Add to destination list
      const destPages = Array.from(destList.pages);
      destPages.splice(destination.index, 0, movedPage);
      const updatedDestList = {
        ...destList,
        pages: destPages,
      };
      const destListIndex = newPdfLists.findIndex(
        (list) => list.id === destList.id
      );
      newPdfLists[destListIndex] = updatedDestList;
    }

    // Update the state
    setPdfLists(newPdfLists);
  };

  return onDragEnd;
}
