"use client";

import { MouseEvent } from "react";
import { RenderElementProps } from "./SwitchCaseElement";
import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setSelectedElement } from "@/Features/blueprint/slice/elementSlice";

const SelectElement: React.FC<RenderElementProps> = ({
  element,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
}) => {
  const { selectedElementId, layoutSelectedElementId } = useSelectedElement();
  const dispatch = useAppDispatch();
  const handleElementClick = (
    event: MouseEvent<HTMLSelectElement>,
    elementId: string
  ) => {
    event.stopPropagation();
    if (elementId === selectedElementId) {
      dispatch(setSelectedElement(""));
    } else {
      dispatch(setSelectedElement(elementId));
    }
  };
  return (
    <>
      <select
        name="testName"
        value={"test"}
        onClick={(e) => handleElementClick(e, element.id)}
      >
        <option value="TR1">TR1</option>
        <option value="test">Test</option>
      </select>
    </>
  );
};

export default SelectElement;
