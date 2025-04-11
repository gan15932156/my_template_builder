"use client";

import { ColorVar } from "../../blockManager/type";
import { strictKeys } from "../defaultColors";
import { ChangeEvent, FocusEvent, useState } from "react";
import styled from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";

interface Props<K extends keyof ColorVar = keyof ColorVar> {
  colorName: K;
  value: string;
  colorKey: keyof ColorVar[K];
  updateColor: (
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.2rem;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${editorStyle.secondary500};
  }
`;
const FieldWrapper = styled.div`
  display: grid;
  align-items: center;
  gap: 0.2rem;
  grid-template-columns: 6rem 4rem;
`;
const Input = styled.input`
  cursor: pointer;
`;
const InputDisabled = styled.input`
  cursor: not-allowed;
  &:disabled {
    background-color: transparent;
  }
`;

const ColorField = <K extends keyof ColorVar>({
  colorName,
  value,
  colorKey,
  updateColor,
}: Props<K>) => {
  const [color, setColor] = useState(value);
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };
  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    updateColor(event.target.value, colorName, colorKey);
  };
  return strictKeys.has(String(colorKey)) ? (
    <Wrapper>
      <label htmlFor="colorValue">{String(colorKey)}</label>
      <FieldWrapper>
        <p>{color}</p>
        <Input
          type="color"
          id="colorValue"
          value={color}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      </FieldWrapper>
    </Wrapper>
  ) : (
    <Wrapper>
      <p>{String(colorKey)}</p>
      <FieldWrapper>
        <p>{color}</p>
        <InputDisabled
          disabled={true}
          type="color"
          id="colorValue"
          value={value}
          onChange={() => {}}
          onBlur={() => {}}
        />
      </FieldWrapper>
    </Wrapper>
  );
};

export default ColorField;
