"use client";

import { useState } from "react";
import { ColorVar } from "../../blockManager/type";
import ColorAccordion from "./ColorAccordion";

interface Props<K extends keyof ColorVar = keyof ColorVar> {
  colorPalette: ColorVar;
  theme: "light" | "dark";
  updateColor: (
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => void;
}
const ColorPaletteList = <K extends keyof ColorVar>({
  colorPalette,
  theme,
  updateColor,
}: Props<K>) => {
  const [current, setCurrent] = useState("");
  const handleChangeTab = (newTab: string) =>
    setCurrent((prev) => (prev === newTab ? "" : newTab));
  return (
    <div>
      {Object.keys(colorPalette).map((name, index) => (
        <ColorAccordion
          key={index}
          theme={theme}
          colorName={name as K}
          colors={colorPalette}
          currentTab={current}
          toggle={handleChangeTab}
          updateColor={updateColor}
        />
      ))}
    </div>
  );
};

export default ColorPaletteList;
