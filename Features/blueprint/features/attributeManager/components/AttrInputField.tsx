"use client";

import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import {
  FormControl,
  InputField,
} from "../../styleManager/components/PropertyField";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";

interface Props {
  name: string; // attr name
  value: string; // attr value
  elementId: string;
  valueType: "ATTR" | "PROPERTY";
}
const AttrInputField: React.FC<Props> = ({
  name,
  value,
  elementId,
  valueType,
}) => {
  const [propertyValue, setPropertyValue] = useState(value);
  const { handleUpdateElementAttr } = useSelectedElement();
  const handleOnFieldBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (valueType === "ATTR")
      handleUpdateElementAttr(elementId, name, propertyValue);
  };
  const handleOnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setPropertyValue(event.target.value);
  };
  useEffect(() => {
    setPropertyValue(value);
  }, [elementId]);
  return (
    <FormControl>
      <label htmlFor={name}>{name}</label>
      <InputField
        type="text"
        name={name}
        id={name}
        value={propertyValue}
        onBlur={handleOnFieldBlur}
        onChange={handleOnFieldChange}
      />
    </FormControl>
  );
};

export default AttrInputField;
