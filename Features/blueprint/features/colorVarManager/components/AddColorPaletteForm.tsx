"use client";

import styled from "styled-components";
import { LeftWrapper, RightWrapper, ContentWrapper } from "./ColorVarManager";
import { InputField } from "../../styleManager/components/PropertyField";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import chroma from "chroma-js";
import { ColorCard } from "./ColorPaletteList";
import useColorVar from "@/Features/blueprint/hooks/useColorVar";

interface Props {
  backToList: () => void;
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.4rem;
`;

const Input = styled(InputField)`
  &::placeholder {
    color: ${editorStyle.secondary500};
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const Button = styled.button`
  border: none;
  padding: 0.1rem 0.2rem;
  color: ${editorStyle.primary500};
  background-color: ${editorStyle.secondary500};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    filter: brightness(0.8);
  }
`;

const AddColorPaletteForm: React.FC<Props> = ({ backToList }) => {
  const [color, setColor] = useState({
    name: "",
    color: chroma.random().hex(),
    isColorShade: false,
  });
  const { handleAddColor } = useColorVar();
  const [colorList, setColorList] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setColor((prev) => ({ ...prev, isColorShade: event.target.checked }));
  };

  const calculateNewColors = (newColor: string = color.color) => {
    if (color.isColorShade) {
      const colors100_500 = chroma
        .scale(["#ffffff", newColor])
        .mode("lch")
        .colors(6)
        .slice(1);
      const colors500_1000 = chroma
        .scale([newColor, "#000000"])
        .mode("lch")
        .colors(6)
        .slice(1, -1);
      setColorList([...colors100_500, ...colors500_1000]);
    } else {
      setColorList([newColor]);
    }
  };

  const handleOnColorBlur = (event: FocusEvent<HTMLInputElement>) => {
    calculateNewColors(event.target.value);
  };

  useEffect(() => {
    calculateNewColors();
  }, [color.isColorShade]);

  const handleAdd = () => {
    if (color.name && color.color) {
      handleAddColor(color, colorList);
      backToList();
    }
  };

  return (
    <ContentWrapper>
      <LeftWrapper>
        <FormWrapper>
          <Input
            type="text"
            name="name"
            placeholder="Type color name..."
            onChange={handleChange}
            value={color.name}
          />
          <Input
            type="color"
            name="color"
            onBlur={handleOnColorBlur}
            onChange={handleChange}
            value={color.color}
          />
          <CheckboxWrapper>
            <label htmlFor="isColorShade">Use color shade?</label>
            <input
              type="checkbox"
              id="isColorShade"
              name="isColorShade"
              checked={color.isColorShade}
              onChange={handleCheckboxChange}
            />
          </CheckboxWrapper>
          <Button onClick={handleAdd}>Add</Button>
        </FormWrapper>
      </LeftWrapper>
      <RightWrapper>
        {colorList.map((colorCode, index) => (
          <ColorCard
            key={index}
            $backgroundColor={colorCode}
            $textColor={
              chroma.contrast(colorCode, "white") > 4.5
                ? editorStyle.secondary500
                : editorStyle.primary500
            }
          >
            <span>
              {color.isColorShade ? (index + 1) * 100 : (index + 5) * 100}
            </span>
            <span>{colorCode}</span>
          </ColorCard>
        ))}
      </RightWrapper>
    </ContentWrapper>
  );
};

export default AddColorPaletteForm;
