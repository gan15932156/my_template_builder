"use client";

import { StylePropertieType } from "@/Features/blueprint/features/styleManager/components/PropertyForm";
import { useEffect, useState } from "react";
import { readStylePropertyFromJSON } from "@/Features/blueprint/actions/styleProperty";
import FormAccordion from "@/Features/blueprint/features/styleManager/components/FormAccordion";
import Field from "./Field";
import { StyleInfo } from "../../hooks/useManageTheme";
import styled from "styled-components";
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 0.6rem;
`;
const PropertyAccordion: React.FC<StyleInfo> = ({ elmType, state }) => {
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
            <Grid>
              {styleProperty[style].map((property, index2) => (
                <Field
                  key={index + index2 + property}
                  styleInfo={{ elmType, state }}
                  propertyName={property}
                />
              ))}
            </Grid>
          </FormAccordion>
        ))}
    </form>
  );
};

export default PropertyAccordion;
