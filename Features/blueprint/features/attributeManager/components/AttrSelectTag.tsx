"use client";

import { TagSet } from "@/Features/blueprint/constants/dragElementRule";
import { FormControl } from "../../styleManager/components/PropertyField";
import { ChangeEvent, useEffect, useState } from "react";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { Select } from "../../styleManager/components/StyleManager";

interface Props {
  name: string; // attr name
  value: string; // attr value
  elementId: string;
  tags: TagSet;
}
const AttrSelectTag: React.FC<Props> = ({ name, value, elementId, tags }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const { handleUpdateElementProperty } = useSelectedElement();
  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrentValue(event.target.value);
    handleUpdateElementProperty(elementId, name, event.target.value);
  };
  useEffect(() => {
    setCurrentValue(value);
  }, [elementId]);
  return (
    <FormControl>
      <label htmlFor={name}>tag</label>
      <Select name={name} value={currentValue} onChange={handleStateChange}>
        {[...tags].map((tag, index) => {
          return (
            <option key={index} value={tag}>
              {tag}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default AttrSelectTag;
