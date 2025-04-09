"use client";

import { ChangeEvent, useState } from "react";
import PropertyForm from "./PropertyForm";
import styled from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { STYLE_STATE } from "@/Features/blueprint/constants";

export const Select = styled.select`
  appearance: none;

  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  border: none;
  padding: 0.1rem;
  margin: 0;
  width: 100%;
  font-family: inherit;
  line-height: inherit;

  /* arrow icon */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
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
          {STYLE_STATE.map((state, index) => (
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
