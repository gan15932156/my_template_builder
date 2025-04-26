"use client";

import { useEffect } from "react";
import useSelectedElement from "./useSelectedElement";
import { selectBlueprint } from "../slice/elementSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setTooltip } from "../slice/elementToolStateSlice";

const useTooltip = (params: {
  elementId: string;
  canInsertElement: boolean;
  targetRef: React.RefObject<HTMLElement>;
}) => {
  const { elementId, canInsertElement, targetRef } = params;
  const { selectedElementId } = useSelectedElement();
  const dispatch = useAppDispatch();
  const currentBlueprint = useAppSelector(selectBlueprint);
  useEffect(() => {
    if (!targetRef.current) return;
    if (selectedElementId === elementId) {
      //   console.log("asdad");
      const target = targetRef.current;
      const rect = target.getBoundingClientRect();
      const y = rect.bottom + window.scrollY - rect.height;
      const x = rect.left + window.scrollX + rect.width / 2;
      dispatch(
        setTooltip({ position: { x, y }, isActive: true, canInsertElement })
      );
    }
  }, [selectedElementId, currentBlueprint]);
};

export default useTooltip;
