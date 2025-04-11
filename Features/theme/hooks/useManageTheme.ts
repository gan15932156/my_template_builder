"use client";

import { TElmType, TStyleState } from "@/Features/blueprint/constants";
import { ColorVar } from "@/Features/blueprint/features/blockManager/type";
import { generateColorVar } from "@/Features/blueprint/hooks/useColorVar";
import {
  clearStyleProperty,
  selectTheme,
  updateStyle,
  updateTheme,
} from "@/Features/blueprint/slice/themeSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useMemo } from "react";
export interface StyleInfo {
  state: TStyleState;
  elmType: TElmType;
}
const useManageTheme = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);

  const colorVars = useMemo(
    () => currentTheme?.colorVars || {},
    [currentTheme]
  );
  const styles = useMemo(() => currentTheme?.styles || {}, [currentTheme]);
  const handleDeleteColor = (colorName: string) => {
    if (!currentTheme?.colorVars) return;

    const tempColor = { ...currentTheme.colorVars };
    delete tempColor[colorName];

    dispatch(updateTheme({ ...currentTheme, colorVars: tempColor }));
  };
  const handleAddColor = (
    colorObject: { name: string; color: string; isColorShade: boolean },
    colors: string[]
  ) => {
    if (!currentTheme) return;

    const tempColor: ColorVar = {
      ...currentTheme.colorVars,
      [colorObject.name]: generateColorVar(colors, colorObject.isColorShade),
    };

    dispatch(updateTheme({ ...currentTheme, colorVars: tempColor }));
  };

  const handleUpdateStyle = (
    styleState: StyleInfo,
    property: string,
    newValue: string
  ) => {
    dispatch(
      updateStyle({
        styleState,
        property,
        newValue,
      })
    );
  };

  const handleClearStyleProperty = (
    styleState: StyleInfo,
    property: string
  ) => {
    dispatch(
      clearStyleProperty({
        styleState,
        property,
      })
    );
  };
  return {
    currentTheme,
    styles,
    colorVars,
    handleDeleteColor,
    handleAddColor,
    handleUpdateStyle,
    handleClearStyleProperty,
  };
};
export default useManageTheme;
