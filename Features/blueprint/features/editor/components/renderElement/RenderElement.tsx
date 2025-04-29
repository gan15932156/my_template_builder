"use client";

import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import SwitchCaseElement from "./SwitchCaseElement";

const RenderElement: React.FC = () => {
  const currentElement = useAppSelector(selectBlueprint);
  if (!currentElement?.element) {
    return (
      <div>
        <p>No element selected for rendering.</p>
      </div>
    );
  }

  if (currentElement?.element) {
    return (
      <SwitchCaseElement
        element={currentElement.element}
        styles={currentElement.styles}
      />
    );
  }

  return (
    <div>
      <p>Error cannot render element.</p>
    </div>
  );
};

export default RenderElement;
