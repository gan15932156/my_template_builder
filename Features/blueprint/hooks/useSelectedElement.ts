"use client";

import {
  selectBlueprint,
  selectDuplicateElementId,
  selectLayoutSelectedElementId,
  selectSelectedElementId,
  setDuplicateElementId,
  setLayoutSelectedElement,
  setSelectedElement,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useMemo } from "react";
import {
  deleteElement,
  duplicateElement,
  findElement,
  updateElementAttr,
  updateElementContent,
  updateElementProperty,
} from "../features/editor/utils/utils";

const useSelectedElement = () => {
  const selectedElementId = useAppSelector(selectSelectedElementId);
  const duplicateElementId = useAppSelector(selectDuplicateElementId);
  const layoutSelectedElementId = useAppSelector(selectLayoutSelectedElementId);
  const currentBlueprint = useAppSelector(selectBlueprint);
  const dispatch = useAppDispatch();

  const selectedElement = useMemo(
    () => findElement(selectedElementId, currentBlueprint?.element),
    [selectedElementId, currentBlueprint]
  );
  const handleDeleteElement = (elementId: string) => {
    if (currentBlueprint?.element) {
      const result = deleteElement(elementId, currentBlueprint);
      if (duplicateElementId === elementId) {
        dispatch(setDuplicateElementId(null));
      }
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
  const handleUpdateElementContent = (elementId: string, value: string) => {
    if (currentBlueprint?.element) {
      const result = updateElementContent(elementId, value, currentBlueprint);
      dispatch(updateElement(result));
    }
  };
  const handleSetSelectedElementId = (elementId: string) => {
    dispatch(setSelectedElement(elementId));
  };
  const handleSetlayoutSelectedElementId = (elementId: string) => {
    dispatch(setLayoutSelectedElement(elementId));
  };
  const handleSetDuplicateElementId = (elementId: string | null) => {
    dispatch(setDuplicateElementId(elementId));
  };
  const handleDuplicateElement = (elementId: string) => {
    if (currentBlueprint?.element && selectedElement) {
      const result = duplicateElement(
        currentBlueprint,
        selectedElement,
        elementId
      );
      dispatch(updateElement(result));
    }
  };
  return {
    handleDeleteElement,
    handleSetSelectedElementId,
    handleSetlayoutSelectedElementId,
    handleSetDuplicateElementId,
    handleUpdateElementAttr,
    handleDuplicateElement,
    handleUpdateElementProperty,
    handleUpdateElementContent,
    selectedElementId,
    duplicateElementId,
    layoutSelectedElementId,
    selectedElement,
  };
};

export default useSelectedElement;
