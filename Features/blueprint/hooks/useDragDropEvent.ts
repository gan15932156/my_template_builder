"use client";

import {
  useDndMonitor,
  DragEndEvent,
  DragOverEvent,
  DragCancelEvent,
  DragMoveEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import useGetBlueprintBlock from "./useGetBlueprintBlock";
import { blockCategories } from "@/Features/blueprint/constants/block";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectBlueprint,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import {
  handleChangeElement,
  handleDropInElement,
  handleDropSiblingElement,
  handleInsertElementToBlueprint,
  handleInsertElementToElement,
} from "../features/editor/utils/handleDragDropEvent";
import { useState } from "react";

export type DropPosition = {
  targetId: string;
  position: "top" | "bottom" | "inner";
};
function useDragDropEvent() {
  const [dropPosition, setDropPosition] = useState<DropPosition | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const { data: blueprintBlock, isError, isLoading } = useGetBlueprintBlock();
  const currentBlueprint = useAppSelector(selectBlueprint);
  const dispatch = useAppDispatch();
  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    // Skip if active or over elements are not defined
    if (!over) {
      setDropPosition(null);
      return;
    }
    const overData = over.data.current;
    const overId = overData?.id;
    const activatorEvent = event.activatorEvent as PointerEvent;
    const clientY = activatorEvent?.clientY;
    const clientX = activatorEvent?.clientX;

    if (!overId || clientY === undefined) return;
    const rect = event.over?.rect;
    if (!rect) return;
    const currentX = event.delta.x + clientX;
    const currentY = event.delta.y + clientY;
    setPosition({
      x: currentX,
      y: currentY,
    });
    const relativeY = currentY - rect.top;
    let positionEnum: "top" | "bottom" | "inner" = "inner";
    if (relativeY < rect.height * 0.25) {
      positionEnum = "top";
    } else if (relativeY > rect.height * 0.75) {
      positionEnum = "bottom";
    }
    setDropPosition({ targetId: overId as string, position: positionEnum });
  };
  useDndMonitor({
    onDragOver: handleDragOver,
    onDragEnd(event: DragEndEvent) {
      const { active, over } = event;

      setDropPosition(null);
      setPosition(null);

      if (!active || !over || !currentBlueprint) return;

      const activeData = active.data.current;
      const overData = over.data.current;

      const activeId = activeData?.id;
      const overId = overData?.id;
      const activeCategory = activeData?.category;

      if (!activeId || !activeCategory || activeId === overId) return;
      if (activeCategory === "form" && overData?.category === "form") return;

      const isDragElement = activeData?.isDragElement;
      const isDragBlueprintBlock = activeData?.isBlueprintBlock;
      const isDropInEditor = overData?.isEditorDropArea;

      // Handle dragging an existing element
      if (isDragElement) {
        if (!dropPosition) return;
        const newBlueprint = handleDropInElement({
          dropPosition,
          activeId,
          elementType: "element",
          blueprint: currentBlueprint,
          element: null,
        });
        dispatch(updateElement(newBlueprint));
        console.log("Dragged existing element.");
        return;
      }

      // Handle dragging a blueprint block
      if (isDragBlueprintBlock) {
        const blueprint = blueprintBlock?.[activeCategory]?.[activeId];
        if (!blueprint) return;

        if (isDropInEditor) {
          const newBlueprint = handleInsertElementToBlueprint(
            currentBlueprint,
            blueprint
          );
          dispatch(updateElement(newBlueprint));
          console.log("Dragged blueprint block into editor.");
          return;
        }

        if (!dropPosition) return;
        const newBlueprint = handleDropInElement({
          dropPosition,
          activeId,
          elementType: "blueprint",
          blueprint: currentBlueprint,
          element: blueprint,
        });
        dispatch(updateElement(newBlueprint));
        console.log("Dragged blueprint block into element.");
        return;
      }

      // Handle dragging a basic block
      const basicBlock = blockCategories?.[activeCategory]?.[activeId];
      if (!basicBlock) return;

      if (isDropInEditor) {
        const newBlueprint = handleInsertElementToBlueprint(
          currentBlueprint,
          basicBlock
        );
        dispatch(updateElement(newBlueprint));
        console.log("Dragged basic block into editor.");
        return;
      }

      if (!dropPosition) return;
      const newBlueprint = handleDropInElement({
        dropPosition,
        activeId,
        elementType: "basic",
        blueprint: currentBlueprint,
        element: basicBlock,
      });
      dispatch(updateElement(newBlueprint));
      console.log("Dragged basic block into element.");
    },
  });

  return { isError, isLoading, dropPosition, position };
}

export default useDragDropEvent;

// if (isDragElement) {
//   if (isDropInElement && currentBlueprint.element) {
//     let tempElement = JSON.parse(
//       JSON.stringify(currentBlueprint.element)
//     ); // Deep clone
//     handleChangeElement(activeId, overId, [tempElement]);
//     dispatch(
//       updateElement({ ...currentBlueprint, element: tempElement })
//     );
//     console.log("DRAG element DROP IN element");
//     return;
//   } else if (isDropInTopElement && currentBlueprint.element) {
//     const result = handleDropSiblingElement({
//       elementType: "ELEMENT",
//       blueprint: currentBlueprint,
//       overId,
//       activeId,
//       element: null,
//       isDropInTopElement,
//     });
//     if (result) dispatch(updateElement({ ...result }));
//     console.log("DRAG element DROP IN top element");
//     return;
//   } else if (!isDropInTopElement && currentBlueprint.element) {
//     const result = handleDropSiblingElement({
//       elementType: "ELEMENT",
//       blueprint: currentBlueprint,
//       overId,
//       activeId,
//       element: null,
//       isDropInTopElement,
//     });
//     if (result) dispatch(updateElement({ ...result }));
//     console.log("DRAG element DROP IN bottom element");
//     return;
//   }
// } else if (isDragBlueprintBlock) {
//   const blueprint = blueprintBlock?.[activeCategory]?.[activeId];
//   if (blueprint) {
//     if (isDropInEditor) {
//       const newBlueprint = handleInsertElementToBlueprint(
//         currentBlueprint,
//         blueprint
//       );
//       dispatch(updateElement(newBlueprint));
//       console.log("DRAG blueprint block DROP IN editor");
//       return;
//     } else if (isDropInElement) {
//       const newBlueprint = handleInsertElementToElement(
//         currentBlueprint,
//         blueprint,
//         overId
//       );
//       dispatch(updateElement(newBlueprint));
//       console.log("DRAG blueprint block DROP IN element");
//       return;
//     } else if (isDropInTopElement && currentBlueprint.element) {
//       const result = handleDropSiblingElement({
//         elementType: "BLUEPRINT",
//         blueprint: currentBlueprint,
//         overId,
//         activeId,
//         element: blueprint,
//         isDropInTopElement,
//       });
//       if (result) dispatch(updateElement({ ...result }));
//       console.log("DRAG blueprint DROP IN top element");
//       return;
//     } else if (!isDropInTopElement && currentBlueprint.element) {
//       const result = handleDropSiblingElement({
//         elementType: "BLUEPRINT",
//         blueprint: currentBlueprint,
//         overId,
//         activeId,
//         element: blueprint,
//         isDropInTopElement,
//       });
//       if (result) dispatch(updateElement({ ...result }));
//       console.log("DRAG blueprint DROP IN bottom element");
//       return;
//     }
//   }
// } else {
//   const block = blockCategories?.[activeCategory]?.[activeId];
//   if (block) {
//     if (isDropInEditor) {
//       const newBlueprint = handleInsertElementToBlueprint(
//         currentBlueprint,
//         block
//       );
//       dispatch(updateElement(newBlueprint));
//       console.log("DRAG basic block DROP IN editor");
//       return;
//     } else if (isDropInElement) {
//       const newBlueprint = handleInsertElementToElement(
//         currentBlueprint,
//         block,
//         overId
//       );
//       dispatch(updateElement(newBlueprint));
//       console.log("DRAG basic block DROP IN element");
//       return;
//     } else if (isDropInTopElement && currentBlueprint.element) {
//       const result = handleDropSiblingElement({
//         elementType: "BASIC_ELEMENT",
//         blueprint: currentBlueprint,
//         overId,
//         activeId,
//         element: block,
//         isDropInTopElement,
//       });
//       if (result) dispatch(updateElement({ ...result }));
//       console.log("DRAG basic DROP IN top element");
//       return;
//     } else if (!isDropInTopElement && currentBlueprint.element) {
//       const result = handleDropSiblingElement({
//         elementType: "BASIC_ELEMENT",
//         blueprint: currentBlueprint,
//         overId,
//         activeId,
//         element: block,
//         isDropInTopElement,
//       });
//       if (result) dispatch(updateElement({ ...result }));
//       console.log("DRAG basic DROP IN bottom element");
//       return;
//     }
//   }
// }
//  else console.warn("Cannot find drag element");
