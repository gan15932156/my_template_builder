"use client";

import styled, { css } from "styled-components";
import SwitchCaseElement, { RenderElementProps } from "./SwitchCaseElement";
import { transformStyleToStyleComponent } from "../../utils/transformData";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useDraggable, useDroppable } from "@dnd-kit/core";
const Box = styled.div<{
  $style: Record<string, any>;
  $isContentExist: boolean;
  $isOver: boolean;
  $isDragging: boolean;
}>`
  outline: 1px dashed ${editorStyle.primary500};
  /* use for case no content exist */
  /* ${(props) =>
    !props.$isContentExist &&
    css`
      padding: 0.2rem;
    `} */
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
}) => {
  const extractedStyles = styles?.[elements.id];
  const elementStyles = transformStyleToStyleComponent(extractedStyles);

  const { isOver, setNodeRef: setDropNodeRef } = useDroppable({
    id: "droppable-" + elements.id,
    data: { isDroppableElement: true, id: elements.id },
    disabled: elements.content.length > 0 || elements.isRefElement,
  });
  // console.log(isRootElement, elements.isRefElement);
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef: setDragNodeRef,
  } = useDraggable({
    id: "draggable-" + elements.id,
    data: { isDraggableElement: true, id: elements.id },
  });
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
          $isContentExist={elements.content.length > 0}
          {...listeners}
          {...attributes}
        >
          {elements.content.map((element) => (
            <SwitchCaseElement
              key={element.id}
              element={element}
              styles={styles}
            />
          ))}
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
          $isContentExist={elements.content.length > 0}
          {...listeners}
          {...attributes}
        >
          <p>Box</p>
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
        $isContentExist={elements.content != ""}
        {...listeners}
        {...attributes}
      >
        {elements.content}
      </Box>
    );
  }
};

export default BoxElement;
