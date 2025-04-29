"use client";

import useTooltip from "@/Features/blueprint/hooks/useTooltip";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import React, { MouseEvent, useRef } from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import SwitchCaseElement, { RenderElementProps } from "./SwitchCaseElement";
import { selectIsUseBorder } from "@/Features/blueprint/slice/panelSlice";

const Form = styled.form<{
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
const FormElement: React.FC<RenderElementProps> = ({
  element: elements,
  styles,
}) => {
  const isUseBorder = useAppSelector(selectIsUseBorder);
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
  const targetRef = useRef<HTMLFormElement | null>(null);
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
  const handleElementClick = (
    event: MouseEvent<HTMLFormElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    handleSetSelectedElementId(elementId);
  };
  // if (isDragging) return;
  if (Array.isArray(elements.content)) {
    if (elements.content.length > 0) {
      return (
        <Form
          ref={(node) => {
            targetRef.current = node;
            setDropNodeRef(node);
            setDragNodeRef(node);
          }}
          id={elements.id}
          onClick={(e) => handleElementClick(e, elements.id)}
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
        </Form>
      );
    } else {
      return (
        <Form
          ref={(node) => {
            targetRef.current = node;
            setDropNodeRef(node);
            setDragNodeRef(node);
          }}
          id={elements.id}
          onClick={(e) => handleElementClick(e, elements.id)}
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
        </Form>
      );
    }
  } else {
    return (
      <Form
        ref={(node) => {
          targetRef.current = node;
          setDropNodeRef(node);
          setDragNodeRef(node);
        }}
        id={elements.id}
        onClick={(e) => handleElementClick(e, elements.id)}
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
      </Form>
    );
  }
};

export default FormElement;
