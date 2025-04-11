"use client";

import styled from "styled-components";
import ColorPaletteList from "./ColorPaletteList";
import useColorVar from "@/Features/blueprint/hooks/useColorVar";
import { ColorVar } from "../../blockManager/type";
const Wrapper = styled.div`
  font-size: 0.8rem;
`;
const ColorVarManager = () => {
  const { colorVars, handleChangeColor } = useColorVar();
  const handleUpdateColor = <K extends keyof ColorVar>(
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => {
    if (colorVars) {
      handleChangeColor({
        colors: colorVars,
        colorKey,
        colorName,
        newColor,
      });
    }
  };
  if (!colorVars) return null;
  return (
    <Wrapper>
      <ColorPaletteList
        colorPalette={colorVars}
        theme="light"
        updateColor={handleUpdateColor}
      />
    </Wrapper>
  );
};

export default ColorVarManager;
