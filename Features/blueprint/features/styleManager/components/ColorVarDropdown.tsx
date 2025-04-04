"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useColorVar from "@/Features/blueprint/hooks/useColorVar";
import styled, { css } from "styled-components";
import chroma from "chroma-js";
import useSelectedStyle from "@/Features/blueprint/hooks/useSelectedStyle";
interface Props {
  propertyName: string;
  propertyValue: string;
  currentStyleState: string;
  closeDropdown: () => void;
}
const Wrapper = styled.div`
  top: 100%;
  position: absolute;
  background-color: ${editorStyle.primary600};
  border-radius: 0.2rem;
  padding: 0.2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  gap: 0.2rem;
  z-index: 999;
  min-width: 16rem;
`;
const ColorPaletteWrapper = styled.div`
  border-radius: 0.2rem;
  padding: 0.2rem;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary600};
`;
const ColorName = styled.p`
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.2rem;
`;
export const ColorCard = styled.div<{
  $backgroundColor: string;
  $textColor: string;
  $isSelected?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  transition: all 0.2s ease;

  &:hover {
    filter: sepia(2) brightness(0.6);
  }

  ${(props) =>
    props.$isSelected &&
    css`
      filter: sepia(2) brightness(0.6);
    `}
`;
const ColorListWrapper = styled.div``;
const ColorVarDropdown: React.FC<Props> = ({
  propertyName,
  propertyValue,
  currentStyleState,
  closeDropdown,
}) => {
  const { colorVars } = useColorVar();
  const { handleUpdateStyle } = useSelectedStyle();
  const handleAddColor = (color: string, propertyName: string) => {
    handleUpdateStyle(currentStyleState, propertyName, color);
    closeDropdown();
  };
  return (
    <Wrapper>
      {Object.keys(colorVars).map((colorName, index) => (
        <ColorPaletteWrapper key={index}>
          <ColorName>{colorName}</ColorName>
          <ColorListWrapper>
            {Object.keys(colorVars[colorName]).map((level, index2) => {
              const textColor =
                chroma.contrast(colorVars[colorName][Number(level)], "white") >
                4.5
                  ? editorStyle.secondary500
                  : editorStyle.primary500;
              const colorVal = "@" + colorName + "." + level;
              return (
                <ColorCard
                  onClick={() => handleAddColor(colorVal, propertyName)}
                  key={index2}
                  $backgroundColor={colorVars[colorName][Number(level)]}
                  $textColor={textColor}
                  $isSelected={colorVal == propertyValue}
                >
                  <span>{level}</span>
                  <span>{colorVars[colorName][Number(level)]}</span>
                </ColorCard>
              );
            })}
          </ColorListWrapper>
        </ColorPaletteWrapper>
      ))}
    </Wrapper>
  );
};

export default ColorVarDropdown;
