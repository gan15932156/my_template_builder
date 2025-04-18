"use client";

import { StylePropertieType } from "@/Features/blueprint/features/styleManager/components/PropertyForm";
import { useEffect, useState } from "react";
import { readStylePropertyFromJSON } from "@/Features/blueprint/actions/styleProperty";
import FormAccordion from "@/Features/blueprint/features/styleManager/components/FormAccordion";
import Field from "./Field";
import _ from "lodash";
import useManageTheme, { StyleInfo } from "../../hooks/useManageTheme";
import styled from "styled-components";
import { getStylesByTypeTagState } from "../showcase/utils";
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 0.6rem;
  column-gap: 0.2rem;
  place-items: center;
`;
const PropertyAccordion: React.FC<StyleInfo> = ({ elmType, state, tag }) => {
  const [styleProperty, setStyleProperty] = useState<StylePropertieType | null>(
    null
  );
  const { styles } = useManageTheme();
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
          const rel = getStylesByTypeTagState(styles, { elmType, state, tag });
          const hasMatch =
            rel && Object.keys(rel).length > 0
              ? _.intersection(Object.keys(rel), styleProperty[style]).length >
                0
              : false;
          return (
            <FormAccordion key={index + style} text={style} hasMatch={hasMatch}>
              <Grid>
                {styleProperty[style].map((property, index2) =>
                  !["color", "background-color", "border-color"].includes(
                    property
                  ) ? (
                    <Field
                      key={index + index2 + property}
                      styleInfo={{ elmType, state, tag }}
                      propertyName={property}
                    />
                  ) : null
                )}
              </Grid>
            </FormAccordion>
          );
        })}
    </form>
  );
};

export default PropertyAccordion;
