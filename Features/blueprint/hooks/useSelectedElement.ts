"use client";

import {
  selectBlueprint,
  selectLayoutSelectedElementId,
  selectSelectedElementId,
  setLayoutSelectedElement,
  setSelectedElement,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useMemo } from "react";
import {
  deleteElement,
  findElement,
  updateElementAttr,
  updateElementProperty,
} from "../features/editor/utils/utils";

const useSelectedElement = () => {
  const selectedElementId = useAppSelector(selectSelectedElementId);
  const layoutSelectedElementId = useAppSelector(selectLayoutSelectedElementId);
  const currentBlueprint = useAppSelector(selectBlueprint);
  const dispatch = useAppDispatch();

  const selectedElement = useMemo(
    () => findElement(selectedElementId, currentBlueprint?.element),
    [selectedElementId]
  );
  const handleDeleteElement = (elementId: string) => {
    if (currentBlueprint?.element) {
      const result = deleteElement(elementId, currentBlueprint);

      dispatch(setSelectedElement(""));
      dispatch(updateElement(result));
    }
  };
  const handleUpdateElementAttr = (
    elementId: string,
    name: string,
    values: string | string[]
  ) => {
    if (currentBlueprint?.element) {
      const result = updateElementAttr(
        elementId,
        name,
        values,
        currentBlueprint
      );
      dispatch(updateElement(result));
    }
  };
  const handleUpdateElementProperty = <T>(
    elementId: string,
    name: string,
    values: T
  ) => {
    if (currentBlueprint?.element) {
      const result = updateElementProperty(
        elementId,
        name,
        values,
        currentBlueprint
      );
      dispatch(updateElement(result));
    }
  };
  const handleSetSelectedElementId = (elementId: string) => {
    dispatch(setSelectedElement(elementId));
  };
  const handleSetlayoutSelectedElementId = (elementId: string) => {
    dispatch(setLayoutSelectedElement(elementId));
  };
  return {
    handleDeleteElement,
    handleSetSelectedElementId,
    handleSetlayoutSelectedElementId,
    handleUpdateElementAttr,
    handleUpdateElementProperty,
    selectedElementId,
    layoutSelectedElementId,
    selectedElement,
  };
};

export default useSelectedElement;
