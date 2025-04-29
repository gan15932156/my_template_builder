"use client";

import styled, { css } from "styled-components";
import SwitchCaseElement, { RenderElementProps } from "./SwitchCaseElement";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import React, { MouseEvent, useRef } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import useSelectedElement from "../../../../hooks/useSelectedElement";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";
import useTooltip from "@/Features/blueprint/hooks/useTooltip";
const Box = styled.div<{
  $style: Record<string, any> | null;
  $isSelected: boolean;
  $isOver: boolean;
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
    (props.$isOver || props.$isSelected) &&
    css`
      outline: 1px solid ${editorStyle.primary500};
    `}
      ${(props) =>
    props.$isDragging &&
    css`
      filter: brightness(0.7) sepia(0.5);
    `}
`;
const BoxElement: React.FC<RenderElementProps> = ({
  element: elements,
  styles,
}) => {
  const { elementStyles, isHorizontalChild } = useParseElementStyle(
    elements.id,
    styles
  );
  const {
    setDropNodeRef,
    setDragNodeRef,
    attributes,
    isOver,
    listeners,
    isDragging,
  } = useDndFunc(elements);
  const targetRef = useRef<HTMLDivElement | null>(null);
  useTooltip({
    elementId: elements.id,
    targetRef,
    canInsertElement: true,
  });
  const {
    selectedElementId,
    layoutSelectedElementId,
    handleSetSelectedElementId,
  } = useSelectedElement();
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const handleElementClick = (
    event: MouseEvent<HTMLDivElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    handleSetSelectedElementId(elementId);
  };
  // if (isDragging) return;
  if (Array.isArray(elements.content)) {
    if (elements.content.length > 0) {
      return (
        <Box
          ref={(node) => {
            targetRef.current = node;
            setDropNodeRef(node);
            setDragNodeRef(node);
          }}
          onClick={(e) => handleElementClick(e, elements.id)}
          as={elements.tag}
          id={elements.id}
          $isUseBorder={isUseBorder}
          $isOver={isOver}
          $style={elementStyles}
          $isDragging={isDragging}
          $isSelected={
            selectedElementId == elements.id ||
            layoutSelectedElementId == elements.id
          }
          {...listeners}
          {...attributes}
        >
          {elements.isListing
            ? [...Array(5)].map((_, index) => {
                const element = elements.content[0];
                if (typeof element == "string") {
                  return (
                    <React.Fragment key={element + index}>
                      {element}
                    </React.Fragment>
                  );
                } else {
                  return (
                    <SwitchCaseElement
                      key={element.id + index}
                      element={element}
                      styles={styles}
                    />
                  );
                }
              })
            : elements.content.map((element, index) => {
                return (
                  <SwitchCaseElement
                    key={element.id}
                    element={element}
                    styles={styles}
                  />
                );
              })}
        </Box>
      );
    } else {
      return (
        <Box
          ref={(node) => {
            targetRef.current = node;
            setDropNodeRef(node);
            setDragNodeRef(node);
          }}
          onClick={(e) => handleElementClick(e, elements.id)}
          as={elements.tag}
          id={elements.id}
          $isUseBorder={isUseBorder}
          $isOver={isOver}
          $style={elementStyles}
          $isDragging={isDragging}
          $isSelected={
            selectedElementId == elements.id ||
            layoutSelectedElementId == elements.id
          }
          {...listeners}
          {...attributes}
        >
          <p>{elements.elmType}</p>
        </Box>
      );
    }
  } else {
    return (
      <Box
        ref={(node) => {
          targetRef.current = node;
          setDropNodeRef(node);
          setDragNodeRef(node);
        }}
        onClick={(e) => handleElementClick(e, elements.id)}
        as={elements.tag}
        id={elements.id}
        $isUseBorder={isUseBorder}
        $isOver={isOver}
        $style={elementStyles}
        $isDragging={isDragging}
        $isSelected={
          selectedElementId == elements.id ||
          layoutSelectedElementId == elements.id
        }
        {...listeners}
        {...attributes}
      >
        {elements.content}
      </Box>
    );
  }
};

export default BoxElement;
