"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { TStyle } from "../features/blockManager/type";
import { transformStyleToStyleComponent } from "../features/editor/utils/transformData";
import { getIsHorizontalChild } from "../features/editor/utils/utils";
import { selectBlueprint } from "../slice/elementSlice";
import { useMemo } from "react";

const useParseElementStyle = (elementId: string, styles?: TStyle) => {
  const currentBlueprint = useAppSelector(selectBlueprint);
  if (!currentBlueprint)
    return {
      extractedStyles: undefined,
      elementStyles: null,
      isHorizontalChild: false,
    };
  const extractedStyles = useMemo(
    () => styles?.[elementId],
    [currentBlueprint, elementId]
  );
  const elementStyles = useMemo(
    () =>
      transformStyleToStyleComponent(
        currentBlueprint.colorVars,
        extractedStyles
      ),
    [currentBlueprint, elementId]
  );
  const isHorizontalChild = getIsHorizontalChild(extractedStyles);
  return {
    extractedStyles,
    elementStyles,
    isHorizontalChild,
  };
};
export default useParseElementStyle;
