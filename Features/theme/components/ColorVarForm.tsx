"use client";

import styled from "styled-components";
import ColorPaletteList from "@/Features/blueprint/features/colorVarManager/components/ColorPaletteList";
import useManageTheme from "../hooks/useManageTheme";
import { ColorVar } from "@/Features/blueprint/features/blockManager/type";

const Wrapper = styled.div`
  font-size: 0.8rem;
`;

const ColorVarForm = () => {
  const { colorVars, handleChangeColor } = useManageTheme();
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

export default ColorVarForm;
