"use client";

import useSelectedStyle from "@/Features/blueprint/hooks/useSelectedStyle";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

interface Props {
  currentStyleState: string;
  propertyName: string;
}
const PropertyField: React.FC<Props> = ({
  currentStyleState,
  propertyName,
}) => {
  const { styles } = useSelectedStyle();

  const [propertyValue, setPropertyValue] = useState(
    styles
      ? styles[currentStyleState]
        ? styles[currentStyleState][propertyName]
        : ""
      : ""
  );
  const handleOnFieldBlue = (event: FocusEvent<HTMLInputElement>) => {
    console.log(currentStyleState, event.target.name, event.target.value);
  };
  const handleOnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPropertyValue(event.target.value);
  };
  useEffect(() => {
    if (
      styles &&
      styles[currentStyleState] &&
      styles[currentStyleState][propertyName]
    ) {
      setPropertyValue(styles[currentStyleState][propertyName]);
    } else {
      setPropertyValue("");
    }
  }, [currentStyleState, styles]);
  return (
    <div>
      <label htmlFor={propertyName}>{propertyName}</label>
      <input
        type="text"
        name={propertyName}
        id={propertyName}
        value={propertyValue}
        onBlur={handleOnFieldBlue}
        onChange={handleOnFieldChange}
      />
    </div>
  );
};

export default PropertyField;
