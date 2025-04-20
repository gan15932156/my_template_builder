import { ThemeStyle2, VariantStyles } from "@/Features/theme/types";
import { TBlueprint, TBlueprintElement, TStyle } from "../blockManager/type";
import { TElmType } from "../../constants";

export function applyStyles(blueprint: TBlueprint, applyStyles: ThemeStyle2) {
  let bStyles: TStyle | undefined;
  try {
    bStyles = structuredClone(blueprint.styles);
  } catch {
    bStyles = JSON.parse(JSON.stringify(blueprint.styles));
  }
  function travelAllElement(element: TBlueprintElement) {
    if (Array.isArray(element.content)) {
      element.content.forEach((item) => travelAllElement(item));
    }
    console.log(
      bStyles?.[element.id],
      element.id,
      element.elmType,
      element.tag
    );
  }
  if (!blueprint.element) {
    return null;
  }
  travelAllElement(blueprint.element);
}

function parseStyles(
  themeStyles: ThemeStyle2,
  elementInfo: {
    id: string;
    type: TElmType;
    tag: string;
    styles: TStyle | undefined;
  }
): Record<string, any> | null {
  const { type, tag, styles, id } = elementInfo;
  const { base: globalBase, ...typeStyles } = themeStyles;

  let mergedStyles: Record<string, any> = {};

  // Parse global base styles
  if (globalBase) {
    const parsedGlobalBase = parseStyleObject(globalBase);
    mergedStyles = _.merge({}, mergedStyles, parsedGlobalBase);
  }

  const currentTypeStyles = typeStyles[type];
  if (!currentTypeStyles) {
    console.warn("Type not found:", type);
    return mergedStyles;
  }

  const { base: typeBase, ...tagStyles } = currentTypeStyles;

  // Parse type-level base styles
  if (typeBase) {
    const parsedTypeBase = parseStyleObject(typeBase as VariantStyles);
    mergedStyles = _.merge({}, mergedStyles, parsedTypeBase);
  }

  const tagSpecificStyles = tagStyles[tag];
  if (!tagSpecificStyles) {
    console.warn("Tag not found:", tag);
    return mergedStyles;
  }

  // Parse tag-specific styles
  const parsedTagStyles = parseStyleObject(tagSpecificStyles as VariantStyles);
  mergedStyles = _.merge({}, mergedStyles, parsedTagStyles);

  return mergedStyles;
}
