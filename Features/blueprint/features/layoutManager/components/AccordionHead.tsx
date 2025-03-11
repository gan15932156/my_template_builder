"use client";

import styled, { css } from "styled-components";
import { FiChevronRight, FiX } from "react-icons/fi";
import { MouseEvent } from "react";
import useSelectedElement from "../../../hooks/useSelectedElement";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
interface Props {
  isActive: boolean;
  isHaveChild: boolean;
  toggle: () => void;
  headingName: string;
  elementId: string;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;
const Heading = styled.p<{ $isHaveChild: boolean }>`
  ${(props) =>
    props.$isHaveChild
      ? css`
          font-weight: bold;
        `
      : css`
          font-weight: 400;
        `}
`;
const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid ${editorStyle.primary500};
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${editorStyle.secondary500};
    background-color: ${editorStyle.primary500};
    color: ${editorStyle.secondary500};
  }
`;
const AccordionHead: React.FC<Props> = ({
  isActive,
  toggle,
  headingName,
  isHaveChild,
  elementId,
}) => {
  const { handleDeleteElement } = useSelectedElement();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDeleteElement(elementId);
  };
  return (
    <Wrapper>
      <ToggleWrapper>
        {isHaveChild && (
          <ToggleButton onClick={toggle}>
            <FiChevronRight
              style={{
                transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </ToggleButton>
        )}
        <Heading $isHaveChild={isHaveChild}>{headingName}</Heading>
      </ToggleWrapper>
      <ToggleButton onClick={handleClick}>
        <FiX />
      </ToggleButton>
    </Wrapper>
  );
};

export default AccordionHead;
