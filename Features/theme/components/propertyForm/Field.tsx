"use client";

import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import useManageTheme, { StyleInfo } from "../../hooks/useManageTheme";
import styled from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { FiX } from "react-icons/fi";
import { getPropertyValue } from "../showcase/utils";
const FieldWrapper = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  align-items: flex-start;
  justify-content: center;
  position: relative;
`;
const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Label = styled.label``;
const InputField = styled.input`
  border: 1px solid ${editorStyle.secondary500};
  background-color: ${editorStyle.secondary300};
  color: ${editorStyle.primary500};
  padding-inline: 0.2rem;
  &:disabled {
    filter: brightness(0.4);
    cursor: not-allowed;
  }
`;
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${editorStyle.secondary500};
  background-color: ${editorStyle.primary500};
  border: 1px solid ${editorStyle.secondary500};
  padding: 0.1rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
    border: 1px solid ${editorStyle.primary500};
  }
`;
interface Props {
  styleInfo: StyleInfo;
  propertyName: string;
}
const Field: React.FC<Props> = ({ styleInfo, propertyName }) => {
  const { styles, handleClearStyleProperty, handleUpdateStyle } =
    useManageTheme();
  const getInitialValue = getPropertyValue(styles, styleInfo, propertyName);
  const [propertyValue, setPropertyValue] = useState(getInitialValue);
  const handleClearProperty = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleClearStyleProperty(styleInfo, propertyName);
  };
  const handleOnFieldBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.target.value !== "") {
      handleUpdateStyle(styleInfo, propertyName, event.target.value);
    }
  };
  const handleOnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setPropertyValue(event.target.value);
  };

  useEffect(() => {
    setPropertyValue((prev) => {
      const newValue = getPropertyValue(styles, styleInfo, propertyName);
      return prev !== newValue ? newValue : prev;
    });
  }, [styleInfo.elmType, styleInfo.state, styleInfo.tag, styles, propertyName]);
  return (
    <FieldWrapper>
      <LabelWrapper>
        <Label htmlFor={propertyName}>{propertyName}</Label>
        {propertyValue != "" && (
          <DeleteButton type="button" onClick={handleClearProperty}>
            <FiX />
          </DeleteButton>
        )}
      </LabelWrapper>
      <InputField
        type="text"
        name={propertyName}
        id={propertyName}
        value={propertyValue}
        onBlur={handleOnFieldBlur}
        onChange={handleOnFieldChange}
      />
    </FieldWrapper>
  );
};

export default Field;
