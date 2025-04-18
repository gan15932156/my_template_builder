import { ELM_TYPES, TElmType } from "@/Features/blueprint/constants";
import _ from "lodash";
import { CSSProperties, ThemeStyle2, VariantStyles } from "../../types";
import { StyleInfo } from "../../hooks/useManageTheme";

function parseStyleObject(styles: VariantStyles) {
  if (!styles) return {};

  // Extract normal styles directly
  const newStyles: Record<string, any> = { ...styles.normal };

  // Handle pseudo-styles
  Object.entries(styles).forEach(([key, value]) => {
    if (key !== "normal" && value) {
      newStyles[`&:${key}`] = value;
    }
  });
  return newStyles;
}
type ParsedExampleStyles = Partial<
  Record<TElmType, Record<string, Record<string, Record<string, string>>>>
>;
const test213: ParsedExampleStyles = {
  box: {
    div: { normal: { padding: "2rem" } },
    footer: { normal: { padding: "1rem" } },
  },
};
export function parseStyles(
  styles: ThemeStyle2 | null
): ParsedExampleStyles | null {
  if (!styles) return null;
  const { base, ...rest } = styles;
  const parsedBaseStyles = parseStyleObject(base);
  let finalStyles: ParsedExampleStyles = {};
  Object.entries(rest).forEach(([key, value]) => {
    const { base: elmTypeBase, ...rest } = value;
    const parsedElmBaseStyles = parseStyleObject(elmTypeBase as VariantStyles);
    const mergedBaseStyles = _.merge({}, parsedBaseStyles, parsedElmBaseStyles);
    let parsedStyles = {};
    Object.entries(rest).forEach(([key2, value]) => {
      const parsedElementStyles = parseStyleObject(value as VariantStyles);
      const mergedElementStyles = _.merge(
        {},
        mergedBaseStyles,
        parsedElementStyles
      );
      parsedStyles = {
        ...parsedStyles,
        [key2]: { ...mergedElementStyles },
      };
    });
    if (key !== "base" && ELM_TYPES.includes(key as TElmType)) {
      finalStyles = {
        ...finalStyles,
        [key as TElmType]: { ...parsedStyles },
      };
    }
  });
  return finalStyles;
}

export function getPropertyValue(
  styles: ThemeStyle2 | null,
  styleInfo: StyleInfo,
  propertyName: string
) {
  if (styleInfo.elmType === "base") {
    return styles?.[styleInfo.elmType]?.[styleInfo.state]?.[propertyName] ?? "";
  } else {
    const rel = styles?.[styleInfo.elmType]?.[styleInfo.tag]?.[
      styleInfo.state
    ] as CSSProperties;
    return rel && rel.hasOwnProperty(propertyName) ? rel[propertyName] : "";
  }
}

// parse individual style each element
export function parseStyles2(
  styles: ThemeStyle2,
  elementInfo: { type: TElmType; tag: string }
): Record<string, any> | null {
  const { type, tag } = elementInfo;
  const { base: globalBase, ...typeStyles } = styles;

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
