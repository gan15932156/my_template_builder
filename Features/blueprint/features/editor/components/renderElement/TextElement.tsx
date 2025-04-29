"use client";

import styled, { css } from "styled-components";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useTooltip from "@/Features/blueprint/hooks/useTooltip";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import { RenderElementProps } from "./SwitchCaseElement";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MouseEvent, useRef } from "react";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";
const Text = styled.h5<{
  $style: Record<string, any> | null;
  $isSelected: boolean;
  $isDragging: boolean;
  $isUseBorder: boolean;
}>`
  position: relative;
  user-select: none;
  &:hover {
    outline: 1px dashed ${editorStyle.primary500};
  }
  ${(props) =>
    props.$isUseBorder &&
    css`
      outline: 1px dashed ${editorStyle.primary500};
    `}
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
`;
const TextElement: React.FC<RenderElementProps> = ({ element, styles }) => {
  const { elementStyles } = useParseElementStyle(element.id, styles);
  const { setDropNodeRef, setDragNodeRef, attributes, listeners, isDragging } =
    useDndFunc(element);
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const {
    selectedElementId,
    layoutSelectedElementId,
    handleSetSelectedElementId,
  } = useSelectedElement();
  const targetRef = useRef<HTMLElement | null>(null);
  useTooltip({
    elementId: element.id,
    targetRef,
    canInsertElement: false,
  });
  const handleElementClick = (
    event: MouseEvent<HTMLElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    handleSetSelectedElementId(elementId);
  };
  // if (isDragging) return;
  return (
    <>
      <Text
        as={element.tag}
        id={element.id}
        ref={(node) => {
          targetRef.current = node;
          setDropNodeRef(node);
          setDragNodeRef(node);
        }}
        $isUseBorder={isUseBorder}
        $style={elementStyles}
        $isDragging={isDragging}
        $isSelected={
          selectedElementId == element.id ||
          layoutSelectedElementId == element.id
        }
        {...listeners}
        {...attributes}
        onClick={(e) => handleElementClick(e, element.id)}
      >
        {!Array.isArray(element.content) && element.content}
      </Text>
    </>
  );
};

export default TextElement;
