"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectBlueprint, updateElement } from "../slice/elementSlice";
import { useMemo } from "react";
import { ColorVar } from "../features/blockManager/type";
import { updateColorPalette } from "../features/colorVarManager/utils";
import { defaultColor } from "../features/colorVarManager/defaultColors";

const useColorVar = () => {
  const dispatch = useAppDispatch();
  const currentBlueprint = useAppSelector(selectBlueprint);

  const colorVars = useMemo(
    () => currentBlueprint?.colorVars || defaultColor,
    [currentBlueprint]
  );

  function handleChangeColor<K extends keyof ColorVar>(params: {
    colors: ColorVar;
    newColor: string;
    colorName: K;
    colorKey: keyof ColorVar[K];
  }) {
    const { colors, newColor, colorName, colorKey } = params;
    const updatedColors = updateColorPalette({
      colors,
      newColor,
      colorName,
      colorKey,
    });
  }
  return { colorVars, handleChangeColor };
};

export default useColorVar;
