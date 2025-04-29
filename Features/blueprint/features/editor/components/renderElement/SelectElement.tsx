"use client";

import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useTooltip from "@/Features/blueprint/hooks/useTooltip";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RenderElementProps } from "./SwitchCaseElement";
import { MouseEvent, useRef } from "react";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";
const Select = styled.select<{
  $style: Record<string, any> | null;
  $isSelected: boolean;
  $isDragging: boolean;
  $isUseBorder: boolean;
}>`
  position: relative;
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
const SelectElement: React.FC<RenderElementProps> = ({ element, styles }) => {
  const { elementStyles } = useParseElementStyle(element.id, styles);
  const {
    selectedElementId,
    layoutSelectedElementId,
    handleSetSelectedElementId,
  } = useSelectedElement();
  const { setDropNodeRef, setDragNodeRef, attributes, listeners, isDragging } =
    useDndFunc(element);
  const targetRef = useRef<HTMLSelectElement | null>(null);
  useTooltip({
    elementId: element.id,
    targetRef,
    canInsertElement: false,
  });
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const handleElementClick = (
    event: MouseEvent<HTMLSelectElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    handleSetSelectedElementId(elementId);
  };
  // if (isDragging) return;
  return (
    <>
      <Select
        ref={(node) => {
          targetRef.current = node;
          setDropNodeRef(node);
          setDragNodeRef(node);
        }}
        id={element.id}
        name="testName"
        value={
          (element.attributes?.options && element.attributes?.options[0]) ??
          "option"
        }
        onChange={() => {}}
        onClick={(e) => handleElementClick(e, element.id)}
        $isUseBorder={isUseBorder}
        $style={elementStyles}
        $isDragging={isDragging}
        $isSelected={
          selectedElementId == element.id ||
          layoutSelectedElementId == element.id
        }
        {...listeners}
        {...attributes}
      >
        {element.attributes?.options &&
        Array.isArray(element.attributes?.options) &&
        element.attributes?.options.length > 0 ? (
          element.attributes.options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))
        ) : (
          <option value="option">option</option>
        )}
      </Select>
    </>
  );
};

export default SelectElement;
