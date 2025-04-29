"use client";

import useGetBlueprintBlock from "./useGetBlueprintBlock";
import { useDndMonitor, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { blockCategories } from "@/Features/blueprint/constants/block";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectBlueprint,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import {
  handleDropInElement,
  handleInsertElementToBlueprint,
} from "../features/editor/utils/handleDragDropEvent";
import { flatternElementTags } from "../constants/dragElementRule";
export type DropDirection = "top" | "bottom" | "inner";
export type DropPosition = {
  targetId: string;
  axis: "row" | "column";
  position: DropDirection;
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
    if (!over) {
      setDropPosition(null);
      return;
    }

    const overData = over.data.current;
    const overId = overData?.id;
    if (!overId) {
      setDropPosition(null);
      return;
    }

    const activatorEvent = event.activatorEvent as PointerEvent;
    const clientX = activatorEvent?.clientX;
    const clientY = activatorEvent?.clientY;
    if (clientX === undefined || clientY === undefined) {
      setDropPosition(null);
      return;
    }

    const targetEl = document.getElementById(overId);
    if (!targetEl) {
      setDropPosition(null);
      return;
    }
    const elementTag = targetEl.tagName.toLowerCase();
    const rect = event.over?.rect;
    if (!rect) {
      setDropPosition(null);
      return;
    }

    const parentElement = targetEl.parentElement;
    if (!parentElement) {
      setDropPosition(null);
      return;
    }

    const parentComputedStyle = window.getComputedStyle(parentElement);

    const currentX = event.delta.x + clientX;
    const currentY = event.delta.y + clientY;

    setPosition({ x: currentX, y: currentY });

    let axis: "row" | "column" = "row";
    let position: DropDirection;
    if (
      parentComputedStyle.display === "flex" &&
      parentComputedStyle.flexDirection === "row"
    ) {
      axis = "column";
      const relativeX = currentX - rect.left;

      if (relativeX < rect.width * 0.25) {
        position = "top";
        setDropPosition({
          targetId: overId,
          position,
          axis,
        });
      } else if (relativeX > rect.width * 0.75) {
        position = "bottom";
        setDropPosition({
          targetId: overId,
          position,
          axis,
        });
      } else {
        if (flatternElementTags.has(elementTag)) {
          setDropPosition(null);
        } else {
          position = "inner";
          setDropPosition({
            targetId: overId,
            position,
            axis,
          });
        }
      }
    } else {
      axis = "row";
      const relativeY = currentY - rect.top;

      if (relativeY < rect.height * 0.25) {
        position = "top";
        setDropPosition({
          targetId: overId,
          position,
          axis,
        });
      } else if (relativeY > rect.height * 0.75) {
        position = "bottom";
        setDropPosition({
          targetId: overId,
          position,
          axis,
        });
      } else {
        if (!(elementTag in flatternElementTags)) {
          position = "inner";
          setDropPosition({
            targetId: overId,
            position,
            axis,
          });
        } else {
          setDropPosition(null);
        }
      }
    }
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
