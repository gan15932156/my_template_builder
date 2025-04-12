"use client";

import { ELM_TYPES, STYLE_STATE } from "@/Features/blueprint/constants";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import PropertyAccordion from "./propertyForm/PropertyAccordion";
import { StyleInfo } from "../hooks/useManageTheme";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
export const Select = styled.select`
  appearance: none;
  background-color: ${editorStyle.secondary300};
  color: ${editorStyle.primary500};
  padding: 0.1rem;
  margin: 0;
  width: 100%;
  font-family: inherit;
  line-height: inherit;
  border: 1px solid ${editorStyle.secondary500};
  /* arrow icon */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
`;
const StyleInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyleForm = () => {
  const [styleInfo, setStyleInfo] = useState<StyleInfo>({
    state: "normal",
    elmType: "box",
  });

  const handleStyleInfoChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStyleInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <Wrapper>
      <StyleInfoWrapper>
        <div>
          <label htmlFor="state">State</label>
          <Select
            name="state"
            id="state"
            value={styleInfo.state}
            onChange={handleStyleInfoChange}
          >
            {STYLE_STATE.map((state, index) => (
              <option value={state} key={index}>
                {state}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="elmType">Apply for element type</label>
          <Select
            name="elmType"
            id="elmType"
            value={styleInfo.elmType}
            onChange={handleStyleInfoChange}
          >
            <option value="*">all</option>
            {ELM_TYPES.map((type, index) => (
              <option value={type} key={index}>
                {type}
              </option>
            ))}
          </Select>
        </div>
      </StyleInfoWrapper>
      <div>
        <PropertyAccordion
          elmType={styleInfo.elmType}
          state={styleInfo.state}
        />
      </div>
    </Wrapper>
  );
};

export default StyleForm;
