"use client";

import styled from "styled-components";
import { ColorVar } from "../../blockManager/type";
import ColorField from "./ColorField";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";

interface Props<K extends keyof ColorVar = keyof ColorVar> {
  colorName: K;
  colors: ColorVar;
  updateColor: (
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => void;
}

const Wrapper = styled.div`
  background-color: ${editorStyle.primary600};
  padding: 0.2rem;
`;
const ColorContent = <K extends keyof ColorVar>({
  colorName,
  colors,
  updateColor,
}: Props<K>) => {
  const colorGroup = colors[colorName];
  return (
    <Wrapper>
      {(Object.keys(colorGroup) as Array<keyof typeof colorGroup>).map(
        (key, index) => {
          return (
            <ColorField
              key={index}
              colorName={colorName}
              colorKey={key as keyof ColorVar[K]}
              value={String(colorGroup[key])}
              updateColor={updateColor}
            />
          );
        }
      )}
    </Wrapper>
  );
};

export default ColorContent;
