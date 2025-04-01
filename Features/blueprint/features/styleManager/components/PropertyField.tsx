"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useSelectedStyle from "@/Features/blueprint/hooks/useSelectedStyle";
import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";

export const FormControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.8rem;
`;
export const DeleteButton = styled.button`
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
export const InputField = styled.input`
  border: 1px solid ${editorStyle.secondary500};
  background-color: ${editorStyle.primary500};
  color: ${editorStyle.secondary500};
  padding-inline: 0.2rem;
  &:disabled {
    filter: brightness(0.4);
    cursor: not-allowed;
  }
`;
interface Props {
  currentStyleState: string;
  propertyName: string;
}

const PropertyField: React.FC<Props> = ({
  currentStyleState,
  propertyName,
}) => {
  const { styles, handleUpdateStyle, handleClearStyleProperty } =
    useSelectedStyle();

  const getInitialValue = () =>
    styles?.[currentStyleState]?.[propertyName] ?? "";

  const [propertyValue, setPropertyValue] = useState(getInitialValue);

  const handleOnFieldBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    handleUpdateStyle(currentStyleState, propertyName, event.target.value);
  };

  const handleOnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setPropertyValue(event.target.value);
  };
  const handleClearProperty = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    // handleUpdateStyle(currentStyleState, propertyName, "");
    handleClearStyleProperty(currentStyleState, propertyName);
  };
  useEffect(() => {
    setPropertyValue((prev) => {
      const newValue = getInitialValue();
      return prev !== newValue ? newValue : prev;
    });
  }, [currentStyleState, styles, propertyName]);

  return (
    <FormControl>
      <label htmlFor={propertyName}>{propertyName}</label>
      <InputField
        type="text"
        name={propertyName}
        id={propertyName}
        value={propertyValue}
        onBlur={handleOnFieldBlur}
        onChange={handleOnFieldChange}
      />
      {propertyValue != "" && (
        <DeleteButton type="button" onClick={handleClearProperty}>
          <FiX />
        </DeleteButton>
      )}
    </FormControl>
  );
};

export default PropertyField;
