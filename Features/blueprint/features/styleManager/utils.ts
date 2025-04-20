import { ELM_TYPES } from "./../../constants/index";
import { ThemeStyle2, VariantStyles } from "@/Features/theme/types";
import {
  DynamicPseudoStyles,
  TBlueprint,
  TBlueprintElement,
  TStyle,
} from "../blockManager/type";
import { TElmType } from "../../constants";
import _ from "lodash";

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
    const appiedStyles = parseStyles(applyStyles, {
      type: element.elmType as TElmType,
      id: element.id,
      styles: bStyles?.[element.id],
      tag: element.tag,
    });
    if (appiedStyles) {
      bStyles = {
        ...bStyles,
        [element.id]: { ...appiedStyles },
      };
    }
    // console.log(appiedStyles);
  }
  if (!blueprint.element) {
    return undefined;
  }
  travelAllElement(blueprint.element);

  return bStyles;
}

function parseStyles(
  themeStyles: ThemeStyle2,
  elementInfo: {
    type: TElmType;
    id: string;
    tag: string;
    styles: DynamicPseudoStyles | undefined;
  }
): DynamicPseudoStyles | undefined {
  const { type, tag, styles, id } = elementInfo;
  const { base: globalBase, ...typeStyles } = themeStyles;

  let mergedStyles: DynamicPseudoStyles | undefined = styles
    ? JSON.parse(JSON.stringify(styles))
    : undefined;

  if (globalBase) {
    mergedStyles = _.merge({}, mergedStyles, globalBase);
  }

  const currentTypeStyles = typeStyles[type];
  if (!currentTypeStyles) {
    return mergedStyles;
  }

  const { base: typeBase, ...tagStyles } = currentTypeStyles;

  if (typeBase) {
    mergedStyles = _.merge({}, mergedStyles, typeBase);
  }

  const tagSpecificStyles = tagStyles[tag];
  if (!tagSpecificStyles) {
    return mergedStyles;
  }

  mergedStyles = _.merge({}, mergedStyles, tagSpecificStyles);

  return mergedStyles;
}
