"use client";

import { MouseEvent, useRef } from "react";
import { RenderElementProps } from "./SwitchCaseElement";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setSelectedElement } from "@/Features/blueprint/slice/elementSlice";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useOverlay2 from "@/Features/blueprint/hooks/useSibingOverlay2";
import Tooltip from "../tooltip/Tooltip";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";
const Select = styled.select<{
  $style: Record<string, any> | null;
  $isSelected: boolean;
  $isDragging: boolean;
  $isUseBorder: boolean;
}>`
  position: relative;
  ${(props) =>
    props.$isUseBorder &&
    css`
      outline: 1px dashed ${editorStyle.primary500};
      &:hover {
        outline: 1px solid ${editorStyle.primary500};
      }
    `}
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
const SelectElement: React.FC<RenderElementProps> = ({
  element,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
}) => {
  const { elementStyles } = useParseElementStyle(element.id, styles);
  const { selectedElementId, layoutSelectedElementId } = useSelectedElement();
  const { setDragNodeRef, attributes, listeners, isDragging } =
    useDndFunc(element);
  const targetRef = useRef<HTMLSelectElement | null>(null);
  const { BottomOverlay, TopOverlay } = useOverlay2(
    isHorizontal,
    targetRef,
    element.id,
    element.category
  );
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const dispatch = useAppDispatch();
  const handleElementClick = (
    event: MouseEvent<HTMLSelectElement>,
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
        isCanPasteElement={false}
        isActive={selectedElementId == element.id}
        targetRef={targetRef}
      />
      {!isRootElement && <TopOverlay />}
      <Select
        ref={(node) => {
          targetRef.current = node;
          setDragNodeRef(node);
        }}
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
      {!isRootElement && isLastElm && <BottomOverlay />}
    </>
  );
};

export default SelectElement;
