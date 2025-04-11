"use client";

import useColorVar from "@/Features/blueprint/hooks/useColorVar";
import { MouseEvent, useState } from "react";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { FiX } from "react-icons/fi";
import chroma from "chroma-js";
import {
  ColorCard,
  ColorItemWrapper,
  ColorListWrapper,
  ContentWrapper,
  DeleteColor,
  LeftWrapper,
  RightWrapper,
} from "./StyledComponents";

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
