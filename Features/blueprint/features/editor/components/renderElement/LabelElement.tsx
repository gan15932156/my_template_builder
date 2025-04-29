"use client";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useTooltip from "@/Features/blueprint/hooks/useTooltip";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { RenderElementProps } from "./SwitchCaseElement";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";
import { MouseEvent, useMemo, useRef } from "react";
const Label = styled.label<{
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
const LabelElement: React.FC<RenderElementProps> = ({ element, styles }) => {
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const relLabelText = useMemo(() => {
    if (element.attributes && element.attributes.hasOwnProperty("labelText")) {
      if (
        !Array.isArray(element.attributes.labelText) &&
        element.attributes.labelText.length > 0
      ) {
        return element.attributes.labelText;
      }
    }
    return "for input";
  }, [element]);
  const { elementStyles } = useParseElementStyle(element.id, styles);
  const { setDropNodeRef, setDragNodeRef, attributes, listeners, isDragging } =
    useDndFunc(element);

  const {
    selectedElementId,
    layoutSelectedElementId,
    handleSetSelectedElementId,
  } = useSelectedElement();
  const targetRef = useRef<HTMLLabelElement | null>(null);
  useTooltip({
    elementId: element.id,
    targetRef,
    canInsertElement: false,
  });
  const handleElementClick = (
    event: MouseEvent<HTMLLabelElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    handleSetSelectedElementId(elementId);
  };
  // if (isDragging) return;
  return (
    <>
      <Label
        ref={(node) => {
          targetRef.current = node;
          setDropNodeRef(node);
          setDragNodeRef(node);
        }}
        id={element.id}
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
        {relLabelText}
      </Label>
    </>
  );
};

export default LabelElement;
