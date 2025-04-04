"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import styled from "styled-components";
import AddColorPaletteForm from "./AddColorPaletteForm";
import ColorPaletteList from "./ColorPaletteList";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  grid-template-rows: auto 1fr;
  /* place-items: center; */
  /* place-content: center; */
  gap: 0.4rem;
  font-size: 0.8rem;
  padding: 1rem 0.2rem;
`;
const ControlWrapper = styled.div`
  grid-column: 1/-1;
  grid-row: 1/2;
  width: 100%;
  border-radius: 0.2rem;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  padding-block: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ControlButton = styled.button`
  cursor: pointer;
  border: 2px solid transparent;
  background-color: transparent;
  display: flex;
  color: inherit;
  align-items: center;
  padding: 0.2rem;
  justify-content: center;
  border-radius: 2rem;
  transition: all 0.2s ease;
  &:hover {
    border: 2px solid ${editorStyle.primary500};
  }
`;
export const LeftWrapper = styled.div`
  background-color: ${editorStyle.primary600};
  border-radius: 0.2rem;
  padding: 0.2rem;
`;

export const RightWrapper = styled.div`
  background-color: ${editorStyle.primary600};
  border-radius: 0.2rem;
  padding: 0.2rem;
`;
export const ContentWrapper = styled.div`
  grid-column: 1/-1;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: subgrid;
  word-break: break-all;
`;
const ColorVarManager = () => {
  const [isAddColor, setIsAddColor] = useState(false);
  const handleControlClick = () => {
    setIsAddColor((prev) => !prev);
  };

  return (
    <Wrapper>
      <ControlWrapper>
        <ControlButton
          onClick={handleControlClick}
          title={isAddColor ? "Back to color list" : "Add new color"}
        >
          {isAddColor ? <RiArrowGoBackFill size={24} /> : <FiPlus size={24} />}
        </ControlButton>
      </ControlWrapper>
      {isAddColor ? (
        <AddColorPaletteForm backToList={handleControlClick} />
      ) : (
        <ColorPaletteList />
      )}
    </Wrapper>
  );
};

export default ColorVarManager;
