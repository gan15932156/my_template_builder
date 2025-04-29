"use client";

import useTooltip from "@/Features/blueprint/hooks/useTooltip";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import styled, { css } from "styled-components";
import { RenderElementProps } from "./SwitchCaseElement";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { MouseEvent, useRef } from "react";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";
const Image = styled.img<{
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
const ImageElement: React.FC<RenderElementProps> = ({ element, styles }) => {
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const { elementStyles } = useParseElementStyle(element.id, styles);
  const { setDropNodeRef, setDragNodeRef, attributes, listeners, isDragging } =
    useDndFunc(element);

  const {
    selectedElementId,
    layoutSelectedElementId,
    handleSetSelectedElementId,
  } = useSelectedElement();
  const targetRef = useRef<HTMLImageElement | null>(null);
  useTooltip({
    elementId: element.id,
    targetRef,
    canInsertElement: false,
  });
  const handleElementClick = (
    event: MouseEvent<HTMLImageElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    handleSetSelectedElementId(elementId);
  };
  // if (isDragging) return;
  return (
    <>
      <Image
        ref={(node) => {
          targetRef.current = node;
          setDropNodeRef(node);
          setDragNodeRef(node);
        }}
        id={element.id}
        src={
          (element.attributes?.src as string) ?? "https://placehold.co/600x400"
        }
        alt={(element.attributes?.alt as string) ?? "Image"}
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
      />
    </>
  );
};

export default ImageElement;
