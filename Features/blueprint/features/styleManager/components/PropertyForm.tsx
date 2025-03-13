"use client";

import { useEffect, useState } from "react";
import FormAccordion from "./FormAccordion";
import PropertyField from "./PropertyField";
import { readStylePropertyFromJSON } from "@/Features/blueprint/actions/styleProperty";
type StylePropertieType = {
  [category: string]: string[];
};
interface Props {
  currentStyleState: string;
}
const PropertyForm: React.FC<Props> = ({ currentStyleState }) => {
  const [styleProperty, setStyleProperty] = useState<StylePropertieType | null>(
    null
  );
  useEffect(() => {
    const getReadstylePropertyJSON = async () => {
      const data = await readStylePropertyFromJSON();
      if (data) {
        setStyleProperty(data.styleProperty);
      }
    };
    getReadstylePropertyJSON();
  }, []);
  return (
    <form>
      {styleProperty &&
        Object.keys(styleProperty).map((style, index) => (
          <FormAccordion key={index + style} text={style}>
            {styleProperty[style].map((property, index2) => (
              <PropertyField
                key={index + index2 + property}
                currentStyleState={currentStyleState}
                propertyName={property}
              />
            ))}
          </FormAccordion>
        ))}
    </form>
  );
};

export default PropertyForm;
