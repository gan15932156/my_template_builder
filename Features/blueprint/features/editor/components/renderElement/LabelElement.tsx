"use client";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import { RenderElementProps } from "./SwitchCaseElement";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { MouseEvent, useMemo, useRef } from "react";
import useOverlay2 from "@/Features/blueprint/hooks/useSibingOverlay2";
import { setSelectedElement } from "@/Features/blueprint/slice/elementSlice";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import Tooltip from "../tooltip/Tooltip";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
const Label = styled.label<{
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
const LabelElement: React.FC<RenderElementProps> = ({
  element,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
}) => {
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
  const { setDragNodeRef, attributes, listeners, isDragging } =
    useDndFunc(element);

  const { selectedElementId, layoutSelectedElementId } = useSelectedElement();
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLLabelElement | null>(null);
  const { BottomOverlay, TopOverlay } = useOverlay2(
    isHorizontal,
    targetRef,
    element.id,
    element.category
  );
  const handleElementClick = (
    event: MouseEvent<HTMLLabelElement>,
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
      <Label
        ref={(node) => {
          targetRef.current = node;
          setDragNodeRef(node);
        }}
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
      {!isRootElement && isLastElm && <BottomOverlay />}
    </>
  );
};

export default LabelElement;
