"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import useSelectedElement from "./useSelectedElement";
import { selectBlueprint } from "../slice/elementSlice";

const useSelectedStyle = () => {
  const { selectedElementId } = useSelectedElement();
  const currentBlueprint = useAppSelector(selectBlueprint);
  if (selectedElementId == "" || !currentBlueprint?.styles)
    return { styles: null };
  const currentStyles = currentBlueprint?.styles[selectedElementId];
  //   console.log(currentStyles);
  return { styles: currentStyles };
};

export default useSelectedStyle;
