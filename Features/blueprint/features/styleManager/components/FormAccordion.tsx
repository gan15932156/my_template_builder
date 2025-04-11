"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

const Wrapepr = styled.div`
  border: 1px solid ${editorStyle.secondary500};
`;
const Heading = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
  color: ${editorStyle.primary500};
  background-color: ${editorStyle.secondary500};
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  text-transform: capitalize;
  cursor: pointer;
`;
const ContentWrapper = styled.div`
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
`;
interface Props {
  text: string;
  children: React.ReactNode;
}
const FormAccordion: React.FC<Props> = ({ text, children }) => {
  const [isActive, setIsActive] = useState(false);
  const handeToggle = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <Wrapepr>
      <Heading onClick={handeToggle} title={text + " tab"}>
        <FiChevronRight
          style={{
            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
        <span>{text}</span>
      </Heading>
      {isActive && <ContentWrapper>{children}</ContentWrapper>}
    </Wrapepr>
  );
};

export default FormAccordion;
