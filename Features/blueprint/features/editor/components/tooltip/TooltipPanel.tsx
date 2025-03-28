"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { MouseEvent } from "react";
import styled from "styled-components";
import useSelectedElement from "../../../../hooks/useSelectedElement";
import { FiX } from "react-icons/fi";

const Wrapper = styled.div`
  font-size: 0.6rem;
  min-width: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ElementTypeBadge = styled.p`
  padding-inline: 0.2rem;
  border-radius: 0.2rem;
  background-color: ${editorStyle.primary400};
`;
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 0.2rem;
  border-radius: 0.2rem;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;
const TooltipPanel = () => {
  const { handleDeleteElement, selectedElement, selectedElementId } =
    useSelectedElement();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDeleteElement(selectedElementId);
  };
  return (
    <Wrapper>
      <div>
        <ElementTypeBadge title="Delete element">
          {selectedElement?.elmType || "n/a"}
        </ElementTypeBadge>
      </div>
      <div>
        <DeleteButton title="Delete element" onClick={(e) => handleClick(e)}>
          <FiX />
        </DeleteButton>
      </div>
    </Wrapper>
  );
};

export default TooltipPanel;
