"use client";

import { ChangeEvent, useState } from "react";
import PropertyForm from "./PropertyForm";

const styleState = ["normal", "hover", "click"];

const StyleManager = () => {
  const [currentStyleState, setCurrentStyleState] = useState("normal");
  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentStyleState(event.target.value);
  };
  return (
    <div>
      <div>
        <select
          name="styleState"
          value={currentStyleState}
          onChange={handleStateChange}
        >
          {styleState.map((state, index) => (
            <option value={state} key={index}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <PropertyForm currentStyleState={currentStyleState} />
    </div>
  );
};

export default StyleManager;
