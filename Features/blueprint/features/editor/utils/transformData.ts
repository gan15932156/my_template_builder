import { ID_LENGTH } from "@/Features/blueprint/constants";
import {
  DynamicPseudoStyles,
  HashMap,
  StyleProperties,
  TBlueprint,
  TBlueprintElement,
  TBlueprintElementWithRefElement,
  TBlueprintRefElement,
  TBlueprintWithRefElement,
  TStyle,
} from "../../blockManager/type";
import { nanoid } from "nanoid";
function transformToTBlueprint(data: {
  id: string;
  name?: string;
  category?: string;
  isBlueprint: boolean;
  styles: object;
  element: object;
}): TBlueprint {
  // Validate styles
  // console.log(data);
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
          throw new Error(`Invalid pseudo styles for element: ${elementId}`);
        }
      }
    }

    return validatedStyles;
  };

  // Validate element
  const validateElement = (
    element: object
  ): TBlueprintElement | TBlueprintRefElement => {
    if ("type" in element) {
      if ((element as any).type === "element") {
        return {
          type: "element",
          id: (element as any).id,
          category: (element as any).category,
          attributes: (element as any).attributes,
          elmType: (element as any).elmType,
          tag: (element as any).tag,
          content: (element as any).content,
        } as TBlueprintElement;
      } else if ((element as any).type === "refElement") {
        return {
          type: "refElement",
          id: (element as any).id,
          isShowElm: (element as any).isShowElm,
          refId: (element as any).refId,
          isUseRef: (element as any).isUseRef,
          category: (element as any).category,
        } as TBlueprintRefElement;
      }
    }
    throw new Error("Invalid element definition");
  };

  // Transform the data
  return {
    id: data.id,
    name: data.name,
    category: data.category,
    isBlueprint: data.isBlueprint,
    styles: validateStyles(data.styles),
    element: validateElement(data.element),
  };
}

function transformRefElementToBlueprint(
  blueprints: HashMap<HashMap<TBlueprint>>,
  oldBlueprint: TBlueprint
): TBlueprintWithRefElement {
  const newStyles = { ...oldBlueprint.styles };
  let tempStyles: TStyle = {};

  function transformRefElement(
    element: TBlueprintElement | TBlueprintRefElement,
    parentIsRefElement: boolean = false
  ): TBlueprintElementWithRefElement {
    const isRefElement = parentIsRefElement || element.type === "refElement";
    let elementId = element.id;

    // Generate a new ID for ref elements
    if (isRefElement) {
      elementId = nanoid(ID_LENGTH);
    }

    if (element.type === "refElement") {
      const category = element.category || "other";
      const refBlueprint = blueprints[category]?.[element.refId];

      if (!refBlueprint) {
        throw new Error(`Blueprint not found for id: ${element.refId}`);
      }

      tempStyles = { ...refBlueprint.styles };

      if (refBlueprint.element) {
        if (refBlueprint.element.type === "refElement") {
          return transformRefElement(refBlueprint.element, true);
        }

        if (refBlueprint.element.type === "element") {
          const newContent = Array.isArray(refBlueprint.element.content)
            ? refBlueprint.element.content.map((item) =>
                transformRefElement(item, true)
              )
            : refBlueprint.element.content;
          if (tempStyles[refBlueprint.element.id]) {
            newStyles[elementId] = tempStyles[refBlueprint.element.id];
          }

          return {
            id: elementId,
            category: refBlueprint.element.category,
            elmType: refBlueprint.element.elmType,
            tag: refBlueprint.element.tag,
            isRefElement: true,
            content: newContent,
            attributes: refBlueprint.element.attributes,
          };
        }
      }

      throw new Error("Unsupported element type in referenced blueprint");
    }

    if (element.type === "element") {
      const newContent = Array.isArray(element.content)
        ? element.content.map((item) => transformRefElement(item, isRefElement))
        : element.content;

      // If this element is flagged as a refElement, associate its style with the new ID
      if (isRefElement && tempStyles[element.id]) {
        newStyles[elementId] = tempStyles[element.id];
      }

      return {
        id: elementId,
        category: element.category,
        elmType: element.elmType,
        tag: element.tag,
        isRefElement,
        content: newContent,
        attributes: element.attributes,
      };
    }

    throw new Error("Unsupported element type");
  }

  if (oldBlueprint.element) {
    const transformedElement = transformRefElement(oldBlueprint.element);
    return {
      id: oldBlueprint.id,
      name: oldBlueprint.name,
      category: oldBlueprint.category,
      isBlueprint: oldBlueprint.isBlueprint,
      imageUrl: oldBlueprint.imageUrl,
      styles: newStyles,
      element: transformedElement,
    };
  }

  throw new Error("Blueprint element is missing");
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

export {
  transformToTBlueprint,
  transformRefElementToBlueprint,
  transformStyleToStyleComponent,
};
