"use client";

import { useDndMonitor, DragEndEvent } from "@dnd-kit/core";
import useGetBlueprintBlock from "./useGetBlueprintBlock";
import { blockCategories } from "@/Features/blueprint/constants/block";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectBlueprint,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import { handleInsertElementToBlueprint } from "../utils/handleDragDropEvent";

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

      if (activeId == overId) return;
      const isDragBlueprint = activeData?.isBlueprint;
      const isDragBlock = activeData?.isBlock;
      const isDropInEditor = overData?.isEditorDropArea;
      const isDropInElement = overData?.isDroppableElement;

      // Skip if not dragged over a valid editor drop area

      const activeCategory = activeData?.category;
      if (isDragBlueprint) {
        // Handle blueprints
        if (activeId && activeCategory) {
          const blueprint = blueprintBlock?.[activeCategory]?.[activeId];
          if (blueprint) {
            if (isDropInEditor) {
              const newBlueprint = handleInsertElementToBlueprint(
                currentBlueprint,
                blueprint
              );
              dispatch(updateElement(newBlueprint));
              // console.log("Blueprint found:", blueprint, "Drop on editor area");
            } else if (isDropInElement) {
              console.log(
                "Blueprint found:",
                blueprint,
                "Drop on another element"
              );
            } else {
              console.log(
                "Blueprint found:",
                blueprint,
                "Drop on another element"
              );
            }
          } else {
            console.warn(
              `Blueprint not found for category: ${activeCategory}, ID: ${activeId}`
            );
          }
        } else {
          console.warn("Missing ID or category in active data.");
        }
      } else if (isDragBlock) {
        // Handle basic elements
        const block = blockCategories?.[activeCategory]?.[activeId];
        if (block) {
          if (isDropInEditor) {
            const newBlueprint = handleInsertElementToBlueprint(
              currentBlueprint,
              block
            );
            // console.log(newBlueprint);
            dispatch(updateElement(newBlueprint));
            // console.log(
            //   "Drag basic element to editor screen",
            //   block,
            //   "Drop on editor area"
            // );
          } else {
            console.log(
              "Drag basic element to editor screen",
              block,
              "Drop on another element"
            );
          }
        } else {
          console.warn("Missing ID or category in active data.");
        }
      } else {
        console.warn("Cannot find drag element");
      }
    },
  });

  return { isError, isLoading };
}

export default useDragDropEvent;
