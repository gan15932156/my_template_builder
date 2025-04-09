"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled from "styled-components";
import ColorVarForm from "./ColorVarForm";
import { IoSaveOutline } from "react-icons/io5";
import StyleForm from "./StyleForm";
const GridWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, max-content);
  gap: 0.2rem;
  font-size: 0.8rem;
`;
const GridItemWrapper = styled.div`
  padding: 0.1rem;
  border: 1px solid ${editorStyle.primary300};
`;
const SaveButton = styled.button`
  cursor: pointer;
  border-radius: 0.2rem;
  border: 1px solid transparent;
  color: ${editorStyle.secondary500};
  background-color: ${editorStyle.primary500};
  display: flex;
  align-items: center;
  padding: 0.2rem 0.8rem;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
    color: ${editorStyle.primary500};
  }
`;
const ThemeForm = () => {
  return (
    <GridWrapper>
      <GridItemWrapper>
        <SaveButton>
          <IoSaveOutline size={24} />
        </SaveButton>
      </GridItemWrapper>
      <GridItemWrapper>
        <ColorVarForm />
      </GridItemWrapper>
      <GridItemWrapper>
        <StyleForm />
      </GridItemWrapper>
    </GridWrapper>
  );
};

export default ThemeForm;
