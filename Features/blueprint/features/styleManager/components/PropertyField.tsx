"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useSelectedStyle from "@/Features/blueprint/hooks/useSelectedStyle";
import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiX } from "react-icons/fi";
import styled from "styled-components";
import ColorVarDropdown from "./ColorVarDropdown";
import Dropdown from "./Dropdown";

export const FormControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.8rem;
  position: relative;
  width: 100%;
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
const Label = styled.label``;

interface Props {
  currentStyleState: string;
  propertyName: string;
}

const PropertyField: React.FC<Props> = ({
  currentStyleState,
  propertyName,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
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
    handleClearStyleProperty(currentStyleState, propertyName);
  };
  const handleShowDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  useEffect(() => {
    setPropertyValue((prev) => {
      const newValue = getInitialValue();
      return prev !== newValue ? newValue : prev;
    });
  }, [currentStyleState, styles, propertyName]);
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <FieldWrapper ref={wrapperRef}>
      <Dropdown
        showDropdown={showDropdown}
        content={
          <ColorVarDropdown
            propertyName={propertyName}
            propertyValue={propertyValue}
            currentStyleState={currentStyleState}
            closeDropdown={handleShowDropdown}
          />
        }
      >
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
          onFocus={() => setShowDropdown(true)}
        />
        {/* {showDropdown &&
        (propertyName == "color" ||
          propertyName == "background-color" ||
          propertyName == "border-color") && (
            <ColorVarDropdown
            propertyName={propertyName}
            propertyValue={propertyValue}
            currentStyleState={currentStyleState}
            closeDropdown={handleShowDropdown}
            />
          )} */}
      </Dropdown>
    </FieldWrapper>
  );
};

export default PropertyField;
