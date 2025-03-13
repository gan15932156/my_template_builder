"use client";

import { ChangeEvent, useState } from "react";
import PropertyForm from "./PropertyForm";
import styled from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";

const Select = styled.select`
  appearance: none;
  // Additional resets for further consistency
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  border: none;
  padding: 0.1rem;
  margin: 0;
  width: 100%;
  font-family: inherit;

  line-height: inherit;
`;
const SelectWrapper = styled.div`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  justify-content: center;
`;
const styleState = ["normal", "hover", "click"];

const StyleManager = () => {
  const [currentStyleState, setCurrentStyleState] = useState("normal");
  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentStyleState(event.target.value);
  };
  const { selectedElementId } = useSelectedElement();
  if (!selectedElementId) return;
  return (
    <Wrapper>
      <SelectWrapper>
        <label htmlFor="styleState" id="styleState">
          State
        </label>
        <Select
          name="styleState"
          value={currentStyleState}
          onChange={handleStateChange}
        >
          {styleState.map((state, index) => (
            <option value={state} key={index}>
              {state}
            </option>
          ))}
        </Select>
      </SelectWrapper>
      <PropertyForm currentStyleState={currentStyleState} />
    </Wrapper>
  );
};

export default StyleManager;
