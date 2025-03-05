"use client";

import {
  selectSelectedElementId,
  setSelectedElement,
} from "@/Features/blueprint/slice/elementSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";

const TooltipPanel = () => {
  const selectedElementId = useAppSelector(selectSelectedElementId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (selectedElementId != "") {
    }
  }, [selectedElementId]);
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("click");
        }}
      >
        Click
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setSelectedElement(""));
        }}
      >
        ❌
      </button>
      <p>{selectedElementId}</p>
    </div>
  );
};

export default TooltipPanel;
