"use client";

import _ from "lodash";
import { FC } from "react";
import FormAccordion from "./FormAccordion";
import PropertyField from "./PropertyField";
import useSelectedStyle from "@/Features/blueprint/hooks/useSelectedStyle";
import { PROPERTIES } from "@/Features/blueprint/constants/styleProperty";

export type StylePropertieType = {
  [category: string]: string[];
};

interface Props {
  currentStyleState: string;
}

const PropertyForm: FC<Props> = ({ currentStyleState }) => {
  const { styles } = useSelectedStyle();
  const currentStyles = styles[currentStyleState] || {};
  const cleanedStyles = _.pickBy(currentStyles, (value) => value !== "");

  return (
    <form>
      {Object.entries(PROPERTIES).map(([category, properties]) => {
        const hasMatch =
          Object.keys(cleanedStyles).length > 0 &&
          _.intersection(Object.keys(cleanedStyles), properties).length > 0;

        return (
          <FormAccordion key={category} text={category} hasMatch={hasMatch}>
            {properties.map((property) => (
              <PropertyField
                key={`${category}-${property}`}
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
