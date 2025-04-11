"use client";

import styled from "styled-components";
import ColorPaletteList from "./ColorPaletteList";
import useColorVar from "@/Features/blueprint/hooks/useColorVar";
import { ColorVar } from "../../blockManager/type";
const Wrapper = styled.div`
  font-size: 0.8rem;
`;
const ColorVarManager = () => {
  const { colorVars } = useColorVar();
  const handleUpdateColor = <K extends keyof ColorVar>(
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => {
    console.log({ newColor, colorName, colorKey });
  };
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
