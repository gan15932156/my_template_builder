"use client";

import { TBlueprintElement, TStyle } from "../../../blockManager/type";
import BoxElement from "./BoxElement";
import ButtonElement from "./ButtonElement";
import FormElement from "./FormElement";
import ImageElement from "./ImageElement";
import InputElement from "./InputElement";
import LabelElement from "./LabelElement";
import LinkElement from "./LinkElement";
import SelectElement from "./SelectElement";
import TextElement from "./TextElement";

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
    case "text":
      return (
        <TextElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
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
    case "select":
      return (
        <SelectElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    case "label":
      return (
        <LabelElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    case "form":
      return (
        <FormElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    case "button":
      return (
        <ButtonElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    case "link":
      return (
        <LinkElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    case "image":
      return (
        <ImageElement
          element={element}
          styles={styles}
          isLastElm={isLastElm}
          isHorizontal={isHorizontal}
          isRootElement={isRootElement}
        />
      );
    default:
      return <div>Unsupported element type: {element.elmType}</div>;
  }
};

export default SwitchCaseElement;
