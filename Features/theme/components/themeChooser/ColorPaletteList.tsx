"use client";

import { ColorVar } from "@/Features/blueprint/features/blockManager/type";
import styled from "styled-components";
import chroma from "chroma-js";

interface Props {
  colorPalette: ColorVar;
}
const PaletteListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-items: start;
  justify-items: center;
`;
const PaletteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;
const Name = styled.p`
  text-transform: capitalize;
`;
const ColorPaletteList = <K extends keyof ColorVar>({
  colorPalette,
}: Props) => {
  return (
    <PaletteListWrapper>
      {Object.keys(colorPalette).map((name, index) => (
        <PaletteWrapper key={index}>
          <Name>{name}</Name>
          <ColorContentList
            key={index}
            colorName={name as K}
            colors={colorPalette}
          />
        </PaletteWrapper>
      ))}
    </PaletteListWrapper>
  );
};

export default ColorPaletteList;

interface Props2<K extends keyof ColorVar = keyof ColorVar> {
  colorName: K;
  colors: ColorVar;
}
const Color = styled.div<{ $color: string; $text: string }>`
  background-color: ${(props) => props.$color};
  color: ${(props) => props.$text};
  padding: 0.1rem;
`;
const ColorContentList = <K extends keyof ColorVar>({
  colorName,
  colors,
}: Props2<K>) => {
  const colorGroup = colors[colorName];
  return (
    <div>
      {(Object.keys(colorGroup) as Array<keyof typeof colorGroup>).map(
        (key, index) => {
          const color = String(colorGroup[key]);
          const contrastText =
            chroma.contrast("#F1F1F1", color) > 4.5 ? "#F1F1F1" : "#1B1B1B";
          return (
            <Color $text={contrastText} $color={color} key={index}>
              {color}
            </Color>
          );
        }
      )}
    </div>
  );
};
