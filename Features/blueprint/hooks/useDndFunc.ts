"use client";

import { useDraggable, useDroppable } from "@dnd-kit/core";
import { TBlueprintElement } from "../features/blockManager/type";

function useDndFunc(element: TBlueprintElement) {
  const { isOver, setNodeRef: setDropNodeRef } = useDroppable({
    id: "droppable-" + element.id,
    data: { isDropElement: true, id: element.id, category: element.category },
  });
  const {
    attributes,
    listeners,
    isDragging,
    transform,
    setNodeRef: setDragNodeRef,
  } = useDraggable({
    id: "draggable-" + element.id,
    data: { isDragElement: true, id: element.id, category: element.category },
  });
  return {
    setDropNodeRef,
    setDragNodeRef,
    isOver,
    transform,
    attributes,
    listeners,
    isDragging,
  };
}

export default useDndFunc;
