"use client";

import { color } from "html2canvas/dist/types/css/types/color";
import { ColorVar } from "../../blockManager/type";
import { strictKeys } from "../defaultColors";

interface Props<K extends keyof ColorVar = keyof ColorVar> {
  colorName: K;
  value: string;
  colorKey: keyof ColorVar[K];
  updateColor: (
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => void;
}
const ColorField = <K extends keyof ColorVar>({
  colorName,
  value,
  colorKey,
  updateColor,
}: Props<K>) => {
  return strictKeys.has(String(colorKey)) ? (
    <div onClick={() => updateColor("#d3d3d3", colorName, colorKey)}>
      {colorName}|{String(colorKey)}|{value}
    </div>
  ) : (
    <div>
      {colorName}|{String(colorKey)}|{value}
    </div>
  );
};

export default ColorField;
