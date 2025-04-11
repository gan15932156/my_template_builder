"use client";

import React from "react";
import { ColorVar } from "../../blockManager/type";
import ColorField from "./ColorField";

interface Props<K extends keyof ColorVar = keyof ColorVar> {
  colorName: K;
  colors: ColorVar;
  updateColor: (
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => void;
}

const ColorContent = <K extends keyof ColorVar>({
  colorName,
  colors,
  updateColor,
}: Props<K>) => {
  const colorGroup = colors[colorName];
  return (
    <div>
      {(Object.keys(colorGroup) as Array<keyof typeof colorGroup>).map(
        (key) => (
          <ColorField
            key={String(key)}
            colorName={colorName}
            colorKey={key as keyof ColorVar[K]}
            value={String(colorGroup[key])}
            updateColor={updateColor}
          />
        )
      )}
    </div>
  );
};

export default ColorContent;
