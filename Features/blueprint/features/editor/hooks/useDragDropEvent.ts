"use client";

import { useDndMonitor, DragEndEvent } from "@dnd-kit/core";
import useGetBlueprintBlock from "./useGetBlueprintBlock";
import { blockCategories } from "@/Features/blueprint/constants/block";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectBlueprint,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import {
  handleChangeElement,
  handleDropSiblingElement,
  handleInsertElementToBlueprint,
  handleInsertElementToElement,
} from "../utils/handleDragDropEvent";

function useDragDropEvent() {
  const { data: blueprintBlock, isError, isLoading } = useGetBlueprintBlock();
  const currentBlueprint = useAppSelector(selectBlueprint);
  const dispatch = useAppDispatch();
  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      const { active, over } = event;

      // Skip if active or over elements are not defined
      if (!active || !over) return;
      if (!currentBlueprint) return;

      const activeData = active.data.current;
      const overData = over.data.current;

      const activeId = activeData?.id;
      const overId = overData?.id;

      const activeCategory = activeData?.category;

      if (activeId == overId) return;

      const isDragBlueprintBlock = activeData?.isBlueprintBlock;
      const isDragElement = activeData?.isDragElement;

      const isDropInEditor = overData?.isEditorDropArea;
      const isDropInElement = overData?.isDropElement;
      const isDropInTopElement = overData?.isTopDropArea;
      // console.log({ isDropInElement, isDragElement, activeId, activeCategory });
      if (activeId && activeCategory) {
        if (isDragElement) {
          if (isDropInElement && currentBlueprint.element) {
            let tempElement = JSON.parse(
              JSON.stringify(currentBlueprint.element)
            ); // Deep clone
            handleChangeElement(activeId, overId, [tempElement]);
            dispatch(
              updateElement({ ...currentBlueprint, element: tempElement })
            );
            console.log("DRAG element DROP IN element");
            return;
          } else if (isDropInTopElement && currentBlueprint.element) {
            const result = handleDropSiblingElement({
              elementType: "ELEMENT",
              blueprint: currentBlueprint,
              overId,
              activeId,
              element: null,
              isDropInTopElement,
            });
            if (result) dispatch(updateElement({ ...result }));
            console.log("DRAG element DROP IN top element");
            return;
          } else if (!isDropInTopElement && currentBlueprint.element) {
            const result = handleDropSiblingElement({
              elementType: "ELEMENT",
              blueprint: currentBlueprint,
              overId,
              activeId,
              element: null,
              isDropInTopElement,
            });
            if (result) dispatch(updateElement({ ...result }));
            console.log("DRAG element DROP IN bottom element");
            return;
          }
        } else if (isDragBlueprintBlock) {
          const blueprint = blueprintBlock?.[activeCategory]?.[activeId];
          if (blueprint) {
            if (isDropInEditor) {
              const newBlueprint = handleInsertElementToBlueprint(
                currentBlueprint,
                blueprint
              );
              dispatch(updateElement(newBlueprint));
              console.log("DRAG blueprint block DROP IN editor");
              return;
            } else if (isDropInElement) {
              const newBlueprint = handleInsertElementToElement(
                currentBlueprint,
                blueprint,
                overId
              );
              dispatch(updateElement(newBlueprint));
              console.log("DRAG blueprint block DROP IN element");
              return;
            } else if (isDropInTopElement && currentBlueprint.element) {
              const result = handleDropSiblingElement({
                elementType: "BLUEPRINT",
                blueprint: currentBlueprint,
                overId,
                activeId,
                element: blueprint,
                isDropInTopElement,
              });
              if (result) dispatch(updateElement({ ...result }));
              console.log("DRAG blueprint DROP IN top element");
              return;
            } else if (!isDropInTopElement && currentBlueprint.element) {
              const result = handleDropSiblingElement({
                elementType: "BLUEPRINT",
                blueprint: currentBlueprint,
                overId,
                activeId,
                element: blueprint,
                isDropInTopElement,
              });
              if (result) dispatch(updateElement({ ...result }));
              console.log("DRAG blueprint DROP IN bottom element");
              return;
            }
          }
        } else {
          const block = blockCategories?.[activeCategory]?.[activeId];
          if (block) {
            if (isDropInEditor) {
              const newBlueprint = handleInsertElementToBlueprint(
                currentBlueprint,
                block
              );
              dispatch(updateElement(newBlueprint));
              console.log("DRAG basic block DROP IN editor");
              return;
            } else if (isDropInElement) {
              const newBlueprint = handleInsertElementToElement(
                currentBlueprint,
                block,
                overId
              );
              dispatch(updateElement(newBlueprint));
              console.log("DRAG basic block DROP IN element");
              return;
            } else if (isDropInTopElement && currentBlueprint.element) {
              const result = handleDropSiblingElement({
                elementType: "BASIC_ELEMENT",
                blueprint: currentBlueprint,
                overId,
                activeId,
                element: block,
                isDropInTopElement,
              });
              if (result) dispatch(updateElement({ ...result }));
              console.log("DRAG basic DROP IN top element");
              return;
            } else if (!isDropInTopElement && currentBlueprint.element) {
              const result = handleDropSiblingElement({
                elementType: "BASIC_ELEMENT",
                blueprint: currentBlueprint,
                overId,
                activeId,
                element: block,
                isDropInTopElement,
              });
              if (result) dispatch(updateElement({ ...result }));
              console.log("DRAG basic DROP IN bottom element");
              return;
            }
          }
        }
        //  else console.warn("Cannot find drag element");
      }
    },
  });

  return { isError, isLoading };
}

export default useDragDropEvent;
