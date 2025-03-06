"use client";

import {
  selectBlueprint,
  selectSelectedElementId,
  setSelectedElement,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useMemo } from "react";
import { deleteElement, findElement } from "../utils/utils";

const useSelectedElement = () => {
  const selectedElementId = useAppSelector(selectSelectedElementId);
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
  return { handleDeleteElement, selectedElementId, selectedElement };
};

export default useSelectedElement;
