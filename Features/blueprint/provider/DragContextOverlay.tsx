"use client";

import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { createPortal } from "react-dom";
import { editorStyle } from "../constants/editorStyle";
import { blockCategories } from "@/Features/blueprint/constants/block";
import { Block } from "../features/blockManager/components/styledComponents";
import { blockIconMap } from "../features/blockManager/components/BlockItem";
import useGetBlueprintBlock from "../hooks/useGetBlueprintBlock";
const DragContextOverlay = () => {
  const { data: blueprintBlock, isLoading, isError } = useGetBlueprintBlock();
  const [currentDragElement, setCurrentDragElement] = useState<Active>();
  useDndMonitor({
    onDragStart: (event) => {
      setCurrentDragElement(event.active);
    },
    onDragCancel: () => {
      setCurrentDragElement(undefined);
    },
    onDragEnd: () => {
      setCurrentDragElement(undefined);
    },
  });
  let Node: JSX.Element = (
    <div
      style={{
        backgroundColor: editorStyle.secondary500,
        borderRadius: ".2rem",
        padding: ".2rem",
      }}
    >
      <p>No element</p>
    </div>
  );
  const isDragBlueprintBlock =
    currentDragElement?.data.current?.isBlueprintBlock;
  const isDraggableElement = currentDragElement?.data.current?.isDragElement;
  const activeCategory = currentDragElement?.data.current?.category;
  const activeId = currentDragElement?.data.current?.id;
  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isError)
    return (
      <div>
        <p>Error loading blueprint. Please try again.</p>
      </div>
    );

  if (isDraggableElement) {
    Node = (
      <div
        style={{
          backgroundColor: editorStyle.secondary500,
          borderRadius: ".2rem",
          padding: ".2rem",
        }}
      >
        <p>Element</p>
      </div>
    );
  } else if (isDragBlueprintBlock) {
    if (activeCategory && activeCategory) {
      const blueprint = blueprintBlock?.[activeCategory]?.[activeId];
      if (blueprint) {
        Node = (
          <Block $dragType="OVERLAY">
            <img
              src={blueprint.imageUrl}
              alt={blueprint.name}
              style={{ width: "100px", objectFit: "cover" }}
            />
            <p style={{ textAlign: "center" }}>
              {blueprint.name ? blueprint.name : "n/a"}
            </p>
          </Block>
        );
      }
    }
  } else {
    const block = blockCategories?.[activeCategory]?.[activeId];
    if (block) {
      Node = (
        <Block $dragType="OVERLAY">
          {block.icon && blockIconMap[block.icon]}
          <p style={{ textAlign: "center" }}>{block.name}</p>
        </Block>
      );
    }
  }
  if (!currentDragElement) return;

  return createPortal(<DragOverlay>{Node}</DragOverlay>, document.body);
};

export default DragContextOverlay;
