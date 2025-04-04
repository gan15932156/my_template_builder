import {
  ColorVar,
  DynamicPseudoStyles,
  StyleProperties,
  TBlueprint,
  TBlueprintElement,
  TStyle,
} from "../../blockManager/type";
function transformToTBlueprint(data: {
  id: string;
  name?: string;
  category?: string;
  isBlueprint: boolean;
  styles: object;
  element: object;
  colorVars: object;
}): TBlueprint {
  // Validate styles
  const validateStyles = (styles: object): TStyle => {
    const validatedStyles: TStyle = {};

    if (styles != null && Object.keys(styles).length > 0) {
      for (const [elementId, pseudoStyles] of Object.entries(styles)) {
        if (
          typeof pseudoStyles === "object" &&
          pseudoStyles !== null &&
          Object.keys(pseudoStyles).length > 0
        ) {
          const validatedPseudoStyles: DynamicPseudoStyles = {};

          for (const [pseudoOrState, styleProperties] of Object.entries(
            pseudoStyles as object
          )) {
            if (
              typeof styleProperties === "object" &&
              styleProperties !== null &&
              Object.keys(styleProperties).every(
                (key) =>
                  typeof key === "string" &&
                  typeof (styleProperties as any)[key] === "string"
              )
            ) {
              validatedPseudoStyles[pseudoOrState] =
                styleProperties as StyleProperties;
            } else {
              throw new Error(
                `Invalid style properties for pseudo/state: ${pseudoOrState} in element: ${elementId}`
              );
            }
          }

          validatedStyles[elementId] = validatedPseudoStyles;
        } else {
          // throw new Error(`Invalid pseudo styles for element: ${elementId}`);
          validatedStyles[elementId] = {};
        }
      }
    }

    return validatedStyles;
  };

  const validateElement = (element: object): TBlueprintElement => {
    return {
      id: (element as any).id,
      category: (element as any).category,
      attributes: (element as any).attributes,
      elmType: (element as any).elmType,
      tag: (element as any).tag,
      isListing: (element as any).isListing,
      isRand: (element as any).isRand,
      content: (element as any).content,
    } as TBlueprintElement;
  };

  // Transform the data
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    isBlueprint: data.isBlueprint,
    styles: validateStyles(data.styles),
    element: validateElement(data.element),
    colorVars: data.colorVars as ColorVar,
  };
}

function transformStyleToStyleComponent(styles?: DynamicPseudoStyles) {
  if (!styles) return {};

  // Extract normal styles directly
  const newStyles: Record<string, any> = { ...styles.normal };

  // Iterate through keys to handle pseudo-styles
  Object.keys(styles).forEach((key) => {
    if (key !== "normal" && styles[key]) {
      newStyles[`&:${key}`] = styles[key];
    }
  });

  return newStyles;
}

export { transformToTBlueprint, transformStyleToStyleComponent };
