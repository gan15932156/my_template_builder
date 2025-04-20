"use client";

import { useEffect, useState } from "react";
import _ from "lodash";
import FormAccordion from "./FormAccordion";
import PropertyField from "./PropertyField";
import { readStylePropertyFromJSON } from "@/Features/blueprint/actions/styleProperty";
import { getStylesByTypeTagState } from "@/Features/theme/components/showcase/utils";
import useSelectedStyle from "@/Features/blueprint/hooks/useSelectedStyle";
export type StylePropertieType = {
  [category: string]: string[];
};
interface Props {
  currentStyleState: string;
}
const PropertyForm: React.FC<Props> = ({ currentStyleState }) => {
  const [styleProperty, setStyleProperty] = useState<StylePropertieType | null>(
    null
  );
  const { styles } = useSelectedStyle();
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
        Object.keys(styleProperty).map((style, index) => {
          const rel = styles[currentStyleState];
          const cleaned = _.pickBy(rel, (value) => value !== "");
          const hasMatch =
            cleaned && Object.keys(cleaned).length > 0
              ? _.intersection(Object.keys(cleaned), styleProperty[style])
                  .length > 0
              : false;
          return (
            <FormAccordion key={index + style} text={style} hasMatch={hasMatch}>
              {styleProperty[style].map((property, index2) => (
                <PropertyField
                  key={index + index2 + property}
                  currentStyleState={currentStyleState}
                  propertyName={property}
                />
              ))}
            </FormAccordion>
          );
        })}
    </form>
  );
};

export default PropertyForm;
