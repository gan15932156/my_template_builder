import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import React, { MouseEvent, useRef } from "react";
import styled, { css } from "styled-components";
import { RenderElementProps } from "./SwitchCaseElement";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import useOverlay2 from "@/Features/blueprint/hooks/useSibingOverlay2";
import Tooltip from "../tooltip/Tooltip";
import { setSelectedElement } from "@/Features/blueprint/slice/elementSlice";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";
const Link = styled.a<{
  $style: Record<string, any> | null;
  $isSelected: boolean;
  $isDragging: boolean;
  $isUseBorder: boolean;
}>`
  position: relative;
  user-select: none;
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
const LinkElement: React.FC<RenderElementProps> = ({
  element,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
}) => {
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const { elementStyles } = useParseElementStyle(element.id, styles);
  const { setDragNodeRef, attributes, listeners, isDragging } =
    useDndFunc(element);

  const { selectedElementId, layoutSelectedElementId } = useSelectedElement();
  const dispatch = useAppDispatch();
  const targetRef = useRef<HTMLAnchorElement | null>(null);
  const { BottomOverlay, TopOverlay } = useOverlay2(
    isHorizontal,
    targetRef,
    element.id,
    element.category
  );
  const handleElementClick = (
    event: MouseEvent<HTMLAnchorElement>,
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
      <Link
        ref={(node) => {
          targetRef.current = node;
          setDragNodeRef(node);
        }}
        href="#"
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
      </Link>
      {!isRootElement && isLastElm && <BottomOverlay />}
    </>
  );
};

export default LinkElement;
