"use client";

import styled from "styled-components";
import { FiChevronRight, FiX } from "react-icons/fi";
import { MouseEvent } from "react";
import useSelectedElement from "../../../hooks/useSelectedElement";
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
const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
        <p>{headingName}</p>
      </ToggleWrapper>
      <ToggleButton onClick={handleClick}>
        <FiX />
      </ToggleButton>
    </Wrapper>
  );
};

export default AccordionHead;
