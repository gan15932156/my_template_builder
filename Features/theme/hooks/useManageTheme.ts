"use client";

import { TElmType, TStyleState } from "@/Features/blueprint/constants";
import { ColorVar } from "@/Features/blueprint/features/blockManager/type";
import { updateColorPalette } from "@/Features/blueprint/features/colorVarManager/utils";
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
  tag: string;
}
const useManageTheme = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(selectTheme);

  const colorVars = useMemo(
    () => currentTheme?.colorVars || null,
    [currentTheme]
  );
  const styles = useMemo(() => currentTheme?.styles || null, [currentTheme]);

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
    if (currentTheme) {
      dispatch(updateTheme({ ...currentTheme, colorVars: updatedColors }));
    }
  }
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
    handleUpdateStyle,
    handleChangeColor,
    handleClearStyleProperty,
  };
};
export default useManageTheme;
