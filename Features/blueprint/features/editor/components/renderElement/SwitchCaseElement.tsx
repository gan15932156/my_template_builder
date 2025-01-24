"use client";

import {
  TBlueprintElementWithRefElement,
  TStyle,
} from "../../../blockManager/type";
import BoxElement from "./BoxElement";
import ImageElement from "./ImageElement";

export interface RenderElementProps {
  element: TBlueprintElementWithRefElement;
  styles?: TStyle;
}

const SwitchCaseElement: React.FC<RenderElementProps> = ({
  element,
  styles,
}) => {
  if (!element?.elmType) {
    return <div>No element type supported</div>;
  }

  switch (element.elmType) {
    case "box":
      return <BoxElement element={element} styles={styles} />;
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
      // return <div>Unsupported element type: {element.elmType}</div>;
      return <div>s</div>;
  }
};

export default SwitchCaseElement;
