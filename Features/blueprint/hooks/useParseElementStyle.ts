"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import { TStyle } from "../features/blockManager/type";
import { transformStyleToStyleComponent } from "../features/editor/utils/transformData";
import { getIsHorizontalChild } from "../features/editor/utils/utils";
import { selectBlueprint } from "../slice/elementSlice";

const useParseElementStyle = (elementId: string, styles?: TStyle) => {
  const currentBlueprint = useAppSelector(selectBlueprint);
  const extractedStyles = styles?.[elementId];
  const elementStyles = transformStyleToStyleComponent(
    currentBlueprint?.colorVars || {},
    extractedStyles
  );
  const isHorizontalChild = getIsHorizontalChild(extractedStyles);
  return { extractedStyles, elementStyles, isHorizontalChild };
};
export default useParseElementStyle;
