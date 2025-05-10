"use client";
import FormAccordion from "@/Features/blueprint/features/styleManager/components/FormAccordion";
import Field from "./Field";
import _ from "lodash";
import useManageTheme, { StyleInfo } from "../../hooks/useManageTheme";
import styled from "styled-components";
import { getStylesByTypeTagState } from "../showcase/utils";
import { PROPERTIES } from "@/Features/blueprint/constants/styleProperty";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 0.6rem;
  column-gap: 0.2rem;
  place-items: center;
`;

const excludedProps = new Set(["color", "background-color", "border-color"]);

const PropertyAccordion: React.FC<StyleInfo> = ({ elmType, state, tag }) => {
  const { styles } = useManageTheme();
  const currentStyles = getStylesByTypeTagState(styles, {
    elmType,
    state,
    tag,
  });
  const cleanedStyles = _.pickBy(currentStyles, (value) => value !== "");

  return (
    <form>
      {Object.entries(PROPERTIES).map(([category, properties]) => {
        const hasMatch =
          Object.keys(cleanedStyles).length > 0 &&
          _.intersection(Object.keys(cleanedStyles), properties).length > 0;

        return (
          <FormAccordion key={category} text={category} hasMatch={hasMatch}>
            <Grid>
              {properties.map((property) =>
                excludedProps.has(property) ? null : (
                  <Field
                    key={`${category}-${property}`}
                    styleInfo={{ elmType, state, tag }}
                    propertyName={property}
                  />
                )
              )}
            </Grid>
          </FormAccordion>
        );
      })}
    </form>
  );
};

export default PropertyAccordion;
