"use client";

import useColorVar from "@/Features/blueprint/hooks/useColorVar";
import { LeftWrapper, RightWrapper, ContentWrapper } from "./ColorVarManager";
import { MouseEvent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { FiX } from "react-icons/fi";
import chroma from "chroma-js";
const ColorListWrapper = styled.div``;

const ColorItemWrapper = styled.div<{ $isSelected: boolean }>`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0.1rem;
  justify-content: space-between;
  transition: all 0.2s ease;
  border-top: 1px solid ${editorStyle.secondary500};
  border-left: 1px solid ${editorStyle.secondary500};
  border-right: 1px solid ${editorStyle.secondary500};
  cursor: pointer;
  &:last-of-type {
    border-bottom: 1px solid ${editorStyle.secondary500};
  }
  &:hover {
    color: ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
  }
  ${(props) =>
    props.$isSelected &&
    css`
      color: ${editorStyle.primary500};
      background-color: ${editorStyle.secondary500};
    `}
`;
const DeleteColor = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;
export const ColorCard = styled.div<{
  $backgroundColor: string;
  $textColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 0.8rem;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
`;
const ColorPaletteList = () => {
  const { colorVars, handleDeleteColor } = useColorVar();
  const [currentColorVar, setCurrentColorVar] = useState<string | null>(null);
  const handleSelectColor = (newSelectColor: string) => {
    if (currentColorVar !== newSelectColor) {
      setCurrentColorVar(newSelectColor);
    }
  };
  const handleBtnDeleteColor = (
    event: MouseEvent<HTMLButtonElement>,
    colorName: string
  ) => {
    event.stopPropagation();
    handleDeleteColor(colorName);
  };
  return (
    <ContentWrapper>
      <LeftWrapper>
        <ColorListWrapper>
          {colorVars &&
            Object.keys(colorVars).map((colorName, index) => (
              <ColorItemWrapper
                $isSelected={colorName === currentColorVar}
                key={index}
                onClick={() => handleSelectColor(colorName)}
              >
                <span>{colorName}</span>
                <DeleteColor
                  onClick={(e) => handleBtnDeleteColor(e, colorName)}
                >
                  <FiX />
                </DeleteColor>
              </ColorItemWrapper>
            ))}
        </ColorListWrapper>
      </LeftWrapper>
      <RightWrapper>
        {currentColorVar &&
          colorVars &&
          colorVars[currentColorVar] &&
          Object.keys(colorVars[currentColorVar]).map((color, index) => {
            const textColor =
              chroma.contrast(
                colorVars[currentColorVar][Number(color)],
                "white"
              ) > 4.5
                ? editorStyle.secondary500
                : editorStyle.primary500;
            return (
              <ColorCard
                key={index}
                $backgroundColor={colorVars[currentColorVar][Number(color)]}
                $textColor={textColor}
              >
                <span>{color}</span>
                <span>{colorVars[currentColorVar][Number(color)]}</span>
              </ColorCard>
            );
          })}
      </RightWrapper>
    </ContentWrapper>
  );
};

export default ColorPaletteList;
