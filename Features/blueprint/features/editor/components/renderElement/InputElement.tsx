"use client";

import { useDraggable } from "@dnd-kit/core";
import { transformStyleToStyleComponent } from "../../utils/transformData";
import { RenderElementProps } from "./SwitchCaseElement";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { MouseEvent, useRef } from "react";
import { setSelectedElement } from "@/Features/blueprint/slice/elementSlice";
import Tooltip from "../tooltip/Tooltip";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useOverlay2 from "@/Features/blueprint/hooks/useSibingOverlay2";
const Input = styled.input<{
  $style: Record<string, any>;
  $isSelected: boolean;
  $isDragging: boolean;
}>`
  position: relative;
  outline: 1px dashed ${editorStyle.primary500};
  /* pointer-events:none; */
  user-select: none;
  &:hover {
    outline: 1px solid ${editorStyle.primary500};
  }
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
    ${(props) =>
      props.$isSelected &&
      css`
        outline: 1px solid ${editorStyle.primary500};
      `}
      ${(props) =>
      props.$isDragging &&
      css`
        filter: brightness(0.7) sepia(0.5);
      `}
  }
`;
const InputElement: React.FC<RenderElementProps> = ({
  element,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
}) => {
  const extractedStyles = styles?.[element.id];
  const elementStyles = transformStyleToStyleComponent(extractedStyles);
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef: setDragNodeRef,
  } = useDraggable({
    id: "draggable-" + element.id,
    data: { isDragElement: true, id: element.id, category: element.category },
  });

  const { selectedElementId, layoutSelectedElementId } = useSelectedElement();
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLInputElement | null>(null);
  const { BottomOverlay, TopOverlay } = useOverlay2(
    isHorizontal,
    targetRef,
    element.id,
    element.category
  );
  const handleElementClick = (
    event: MouseEvent<HTMLInputElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    if (elementId === selectedElementId) {
      dispatch(setSelectedElement(""));
    } else {
      dispatch(setSelectedElement(elementId));
    }
  };
  if (isDragging) return;
  return (
    <>
      <Tooltip
        isActive={selectedElementId == element.id}
        targetRef={targetRef}
      />
      {!isRootElement && <TopOverlay />}
      <Input
        ref={(node) => {
          targetRef.current = node;
          setDragNodeRef(node);
        }}
        placeholder={
          (element.attributes?.placeholder as string) ?? "placeholder"
        }
        name={(element.attributes?.name as string) ?? element.id}
        type={(element.attributes?.type as string) ?? "text"}
        $style={elementStyles}
        $isDragging={isDragging}
        $isSelected={
          selectedElementId == element.id ||
          layoutSelectedElementId == element.id
        }
        {...listeners}
        {...attributes}
        onClick={(e) => handleElementClick(e, element.id)}
      />
      {!isRootElement && isLastElm && <BottomOverlay />}
    </>
  );
};

export default InputElement;
