import { ColorVar } from "../blockManager/type";

const generateColors = (color: string) => {};

export function updateColorPalette<K extends keyof ColorVar>(params: {
  colors: ColorVar;
  newColor: string;
  colorName: K;
  colorKey: keyof ColorVar[K];
}): ColorVar {
  const { colors, newColor, colorName, colorKey } = params;
  // Example usage
  const currentValue = colors[colorName][colorKey];
  console.log("Old value:", currentValue);
  console.log("New value:", newColor);

  // You could return a new object with the updated color if needed:
  return {
    ...colors,
    [colorName]: {
      ...colors[colorName],
      [colorKey]: newColor,
    },
  };
}
