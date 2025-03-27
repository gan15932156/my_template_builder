"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { FormControl } from "../../styleManager/components/PropertyField";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";

interface Props {
  name: string; // attr name
  value: boolean; // attr value
  elementId: string;
  valueType: "ATTR" | "PROPERTY";
}
const AttrCheckboxField: React.FC<Props> = ({
  name,
  value,
  elementId,
  valueType,
}) => {
  const [propertyValue, setPropertyValue] = useState<boolean>(value);
  const { handleUpdateElementProperty } = useSelectedElement();
  const handleOnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setPropertyValue(event.target.checked);
  };
  useEffect(() => {
    setPropertyValue(value);
  }, [elementId]);
  useEffect(() => {
    handleUpdateElementProperty(elementId, name, propertyValue);
  }, [propertyValue]);
  return (
    <FormControl>
      <label htmlFor={name}>{name}</label>
      <input
        type="checkbox"
        name={name}
        checked={propertyValue}
        onChange={handleOnFieldChange}
      />
    </FormControl>
  );
};

export default AttrCheckboxField;
