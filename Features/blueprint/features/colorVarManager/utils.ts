import { ColorVar } from "../blockManager/type";
import chroma from "chroma-js";

function generateShades(mainColor: string) {
  const light = chroma(mainColor).tint(0.3).hex(); // lighter shade
  const dark = chroma(mainColor).shade(0.5).hex(); // darker shade

  // contrastText: use white or black depending on which has better contrast
  const contrastText =
    chroma.contrast("white", mainColor) > 4.5 ? "#F1F1F1" : "#1B1B1B";

  return {
    light,
    dark,
    contrastText,
  };
}
export function updateColorPalette<K extends keyof ColorVar>(params: {
  colors: ColorVar;
  newColor: string;
  colorName: K;
  colorKey: keyof ColorVar[K];
}): ColorVar {
  const { colors, newColor, colorName, colorKey } = params;

  const currentValue = colors[colorName];

  // Only apply auto-generation for groups that support light/dark/contrastText
  const isShadedGroup =
    "main" in currentValue &&
    "light" in currentValue &&
    "dark" in currentValue &&
    "contrastText" in currentValue;

  if (colorKey === "main" && isShadedGroup) {
    const { light, dark, contrastText } = generateShades(newColor);

    return {
      ...colors,
      [colorName]: {
        ...colors[colorName],
        main: newColor,
        light,
        dark,
        contrastText,
      },
    };
  }

  // Default update logic
  return {
    ...colors,
    [colorName]: {
      ...colors[colorName],
      [colorKey]: newColor,
    },
  };
}
