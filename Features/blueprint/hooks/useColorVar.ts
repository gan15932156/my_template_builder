"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectBlueprint, updateElement } from "../slice/elementSlice";
import { useMemo } from "react";
import { ColorVar } from "../features/blockManager/type";

const useColorVar = () => {
  const dispatch = useAppDispatch();
  const currentBlueprint = useAppSelector(selectBlueprint);

  const colorVars = useMemo(
    () => currentBlueprint?.colorVars || {},
    [currentBlueprint]
  );

  const handleDeleteColor = (colorName: string) => {
    if (!currentBlueprint?.colorVars) return;

    const tempColor = { ...currentBlueprint.colorVars };
    delete tempColor[colorName];

    dispatch(updateElement({ ...currentBlueprint, colorVars: tempColor }));
  };

  const generateColorVar = (colors: string[], isColorShade: boolean) => {
    return isColorShade
      ? Object.fromEntries(
          colors.map((color, index) => [(index + 1) * 100, color])
        )
      : { 500: colors[0] };
  };

  const handleAddColor = (
    colorObject: { name: string; color: string; isColorShade: boolean },
    colors: string[]
  ) => {
    if (!currentBlueprint) return;

    const tempColor: ColorVar = {
      ...currentBlueprint.colorVars,
      [colorObject.name]: generateColorVar(colors, colorObject.isColorShade),
    };

    dispatch(updateElement({ ...currentBlueprint, colorVars: tempColor }));
  };

  return { colorVars, handleDeleteColor, handleAddColor };
};

export default useColorVar;
