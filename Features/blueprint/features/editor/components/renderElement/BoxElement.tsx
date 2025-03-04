"use client";

import styled, { css } from "styled-components";
import SwitchCaseElement, { RenderElementProps } from "./SwitchCaseElement";
import { transformStyleToStyleComponent } from "../../utils/transformData";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import useOverlay from "../../hooks/useSibingOverlay";
const Box = styled.div<{
  $style: Record<string, any>;
  $isOver: boolean;
  $isDragging: boolean;
}>`
  position: relative;
  outline: 1px dashed ${editorStyle.primary500};
  && {
    ${(props) =>
      props.$style &&
      css`
        ${props.$style}
      `}
    ${(props) =>
      props.$isOver &&
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
const BoxElement: React.FC<RenderElementProps> = ({
  element: elements,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
}) => {
  const extractedStyles = styles?.[elements.id];
  const elementStyles = transformStyleToStyleComponent(extractedStyles);

  const { isOver, setNodeRef: setDropNodeRef } = useDroppable({
    id: "droppable-" + elements.id,
    data: { isDropElement: true, id: elements.id, category: elements.category },
    // disabled: elements.content.length > 0,
  });
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef: setDragNodeRef,
  } = useDraggable({
    id: "draggable-" + elements.id,
    data: { isDragElement: true, id: elements.id, category: elements.category },
  });
  const { TopOverlay, BottomOverlay } = useOverlay(
    isHorizontal,
    elements.id,
    elements.category
  );
  if (isDragging) return;
  if (Array.isArray(elements.content)) {
    if (elements.content.length > 0) {
      return (
        <Box
          ref={(node) => {
            setDropNodeRef(node);
            setDragNodeRef(node);
          }}
          as={elements.tag}
          $isOver={isOver}
          $style={elementStyles}
          $isDragging={isDragging}
          {...listeners}
          {...attributes}
        >
          {!isRootElement && <TopOverlay />}
          {elements.id}
          {elements.content.map((element, index) => {
            const isLastChildElm = index + 1 == elements.content.length;
            return (
              <SwitchCaseElement
                key={element.id}
                element={element}
                styles={styles}
                isLastElm={isLastChildElm}
                isHorizontal={isHorizontal}
                isRootElement={false}
              />
            );
          })}
          {!isRootElement && isLastElm && <BottomOverlay />}
        </Box>
      );
    } else {
      return (
        <Box
          ref={(node) => {
            setDropNodeRef(node);
            setDragNodeRef(node);
          }}
          as={elements.tag}
          $isOver={isOver}
          $style={elementStyles}
          $isDragging={isDragging}
          {...listeners}
          {...attributes}
        >
          {!isRootElement && <TopOverlay />}
          <p>{elements.id}</p>
          {!isRootElement && isLastElm && <BottomOverlay />}
        </Box>
      );
    }
  } else {
    return (
      <Box
        ref={(node) => {
          setDropNodeRef(node);
          setDragNodeRef(node);
        }}
        as={elements.tag}
        $isOver={isOver}
        $style={elementStyles}
        $isDragging={isDragging}
        {...listeners}
        {...attributes}
      >
        {elements.id}
        {elements.content}
      </Box>
    );
  }
};

export default BoxElement;
