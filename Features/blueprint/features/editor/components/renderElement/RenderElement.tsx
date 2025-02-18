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
    const isLastElm = Array.isArray(currentElement.element.content)
      ? currentElement.element.content.length == 1
      : true;
    const parentStyles = currentElement.styles?.[currentElement.element.id];
    let isHorizontal = true;
    if (parentStyles) {
      isHorizontal =
        parentStyles.normal["display"] != "flex" ||
        parentStyles.normal["flex-direction"] != "row";
    }
    return (
      <SwitchCaseElement
        element={currentElement.element}
        styles={currentElement.styles}
        isLastElm={isLastElm}
        isHorizontal={isHorizontal}
        isRootElement={true}
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
