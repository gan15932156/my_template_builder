"use client";

import { ChangeEvent, useState } from "react";
import { FormControl } from "../../styleManager/components/PropertyField";
import { Select } from "../../styleManager/components/StyleManager";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";

interface Props {
  name: string; // attr name
  value: string; // attr value
  elementId: string;
  type: "INPUT_TYPE" | "NA";
}
const INPUT_TYPE = ["text", "password", "email"];
const AttrSelectbox: React.FC<Props> = ({ name, value, elementId, type }) => {
  const { handleUpdateElementAttr } = useSelectedElement();
  const [currentValue, setCurrentValue] = useState(value);
  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(event.target.value);
    handleUpdateElementAttr(elementId, name, event.target.value);
  };
  return (
    <FormControl>
      <label htmlFor={name}>{name}</label>
      <Select name={name} value={currentValue} onChange={handleStateChange}>
        {type === "INPUT_TYPE" &&
          INPUT_TYPE.map((type, index) => (
            <option value={type} key={index}>
              {type}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};

export default AttrSelectbox;
