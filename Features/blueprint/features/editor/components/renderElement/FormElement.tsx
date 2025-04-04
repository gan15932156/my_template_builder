"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled, { css } from "styled-components";
import SwitchCaseElement, { RenderElementProps } from "./SwitchCaseElement";
import useDndFunc from "@/Features/blueprint/hooks/useDndFunc";
import useOverlay2 from "@/Features/blueprint/hooks/useSibingOverlay2";
import React, { MouseEvent, useRef } from "react";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setSelectedElement } from "@/Features/blueprint/slice/elementSlice";
import Tooltip from "../tooltip/Tooltip";
import useParseElementStyle from "@/Features/blueprint/hooks/useParseElementStyle";

const Form = styled.form<{
  $style: Record<string, any>;
  $isSelected: boolean;
  $isOver: boolean;
  $isDragging: boolean;
}>`
  position: relative;
  outline: 1px dashed ${editorStyle.primary500};

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
      (props.$isOver || props.$isSelected) &&
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
const FormElement: React.FC<RenderElementProps> = ({
  element: elements,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
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
  const targetRef = useRef<HTMLFormElement | null>(null);
  const { TopOverlay, BottomOverlay } = useOverlay2(
    isHorizontal,
    targetRef,
    elements.id,
    elements.category
  );
  const { selectedElementId, layoutSelectedElementId } = useSelectedElement();
  const dispatch = useAppDispatch();
  const handleElementClick = (
    event: MouseEvent<HTMLFormElement>,
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
  if (Array.isArray(elements.content)) {
    if (elements.content.length > 0) {
      return (
        <Form
          ref={(node) => {
            targetRef.current = node;
            setDropNodeRef(node);
            setDragNodeRef(node);
          }}
          onClick={(e) => handleElementClick(e, elements.id)}
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
          <Tooltip
            isActive={selectedElementId == elements.id}
            targetRef={targetRef}
          />
          {!isRootElement && <TopOverlay />}
          {elements.isListing
            ? [...Array(5)].map((_, index) => {
                const isLastChildElm = index + 1 == elements.content.length;
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
                      isLastElm={isLastChildElm}
                      isHorizontal={isHorizontalChild}
                      isRootElement={false}
                    />
                  );
                }
              })
            : elements.content.map((element, index) => {
                const isLastChildElm = index + 1 == elements.content.length;
                return (
                  <SwitchCaseElement
                    key={element.id}
                    element={element}
                    styles={styles}
                    isLastElm={isLastChildElm}
                    isHorizontal={isHorizontalChild}
                    isRootElement={false}
                  />
                );
              })}
          {!isRootElement && isLastElm && <BottomOverlay />}
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
          onClick={(e) => handleElementClick(e, elements.id)}
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
          <Tooltip
            isActive={selectedElementId == elements.id}
            targetRef={targetRef}
          />
          {!isRootElement && <TopOverlay />}
          <p>{elements.elmType}</p>
          {!isRootElement && isLastElm && <BottomOverlay />}
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
        onClick={(e) => handleElementClick(e, elements.id)}
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
        <Tooltip
          isActive={selectedElementId == elements.id}
          targetRef={targetRef}
        />
        {elements.content}
      </Form>
    );
  }
};

export default FormElement;
