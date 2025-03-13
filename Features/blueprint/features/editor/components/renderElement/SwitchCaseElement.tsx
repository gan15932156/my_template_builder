"use client";

import { TBlueprintElement, TStyle } from "../../../blockManager/type";
import BoxElement from "./BoxElement";
import ImageElement from "./ImageElement";
import InputElement from "./InputElement";

export interface RenderElementProps {
  element: TBlueprintElement;
  styles?: TStyle;
  isLastElm?: boolean;
  isHorizontal?: boolean;
  isRootElement?: boolean;
}

const SwitchCaseElement: React.FC<RenderElementProps> = ({
  element,
  styles,
  isLastElm = false,
  isHorizontal = true,
  isRootElement,
}) => {
  if (!element?.elmType) {
    return <div>No element type supported</div>;
  }

  switch (element.elmType) {
    case "box":
      return (
        <BoxElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    case "input":
      return (
        <InputElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    // case "image":
    //   return (
    //     <ImageElement
    //       element={element}
    //       styles={styles}
    //       isRootElement={isRootElement}
    //     />
    //   );
    // case "text":
    //   return <div>Text Element</div>;
    default:
      return <div>Unsupported element type: {element.elmType}</div>;
  }
};

export default SwitchCaseElement;
