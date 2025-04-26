import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import _ from "lodash";
export function overrideStyle(params: {
  style: Record<string, any> | null;
  isSelected: boolean;
  isOver: boolean;
  isDragging: boolean;
  isUseBorder: boolean;
}): Record<string, any> | null {
  const { style, isSelected, isDragging, isOver, isUseBorder } = params;
  let tempStyles: Record<string, any> | null = style
    ? JSON.parse(JSON.stringify(style))
    : null;
  if (isUseBorder) {
    console.log(isUseBorder);
    tempStyles = _.merge({}, tempStyles, {
      outline: ` 1px dashed ${editorStyle.primary500}`,
    });
  }
  //  "&:hover": `{outline: 1px solid ${editorStyle.primary500};}
  if (isOver || isSelected) {
    tempStyles = _.merge({}, tempStyles, {
      outline: `1px solid ${editorStyle.primary500}`,
    });
  }
  if (isDragging) {
    tempStyles = _.merge({}, tempStyles, {
      filter: `brightness(0.7) sepia(0.5)`,
    });
  }
  return tempStyles;
}

/**
 * Converts kebab-case CSS property names to camelCase
 * @param styleName - CSS property in kebab-case
 * @returns CSS property in camelCase
 */
export function toCamelCase(styleName: string): string {
  return styleName.replace(/-([a-z])/g, (_, char: string) =>
    char.toUpperCase()
  );
}

/**
 * Converts camelCase CSS property names to kebab-case
 * @param styleName - CSS property in camelCase
 * @returns CSS property in kebab-case
 */
export function toKebabCase(styleName: string): string {
  return styleName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
