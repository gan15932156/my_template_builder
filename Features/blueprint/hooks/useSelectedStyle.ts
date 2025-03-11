"use client";

import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import useSelectedElement from "./useSelectedElement";
import {
  clearStyleProperty,
  selectBlueprint,
  updateStyle,
} from "../slice/elementSlice";

const useSelectedStyle = () => {
  const dispatch = useAppDispatch();
  const { selectedElementId } = useSelectedElement();
  const currentBlueprint = useAppSelector(selectBlueprint);

  if (!selectedElementId || !currentBlueprint?.styles) {
    return {
      styles: {},
      handleUpdateStyle: () => {},
      handleClearStyleProperty: () => {},
    };
  }

  const currentStyles = currentBlueprint.styles[selectedElementId] || {};

  const handleUpdateStyle = (
    styleState: string,
    property: string,
    newValue: string
  ) => {
    dispatch(
      updateStyle({
        elementId: selectedElementId,
        styleState,
        property,
        newValue,
      })
    );
  };

  const handleClearStyleProperty = (styleState: string, property: string) => {
    dispatch(
      clearStyleProperty({
        elementId: selectedElementId,
        styleState,
        property,
      })
    );
  };

  return { styles: currentStyles, handleUpdateStyle, handleClearStyleProperty };
};

export default useSelectedStyle;
