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
}

const SwitchCaseElement: React.FC<RenderElementProps> = ({
  element,
  styles,
}) => {
  if (!element?.elmType) {
    return <div>No element type supported</div>;
  }

  switch (element.elmType) {
    case "text":
      return <TextElement element={element} styles={styles} />;
    case "box":
      return <BoxElement element={element} styles={styles} />;
    case "input":
      return <InputElement element={element} styles={styles} />;
    case "select":
      return <SelectElement element={element} styles={styles} />;
    case "label":
      return <LabelElement element={element} styles={styles} />;
    case "form":
      return <FormElement element={element} styles={styles} />;
    case "button":
      return <ButtonElement element={element} styles={styles} />;
    case "link":
      return <LinkElement element={element} styles={styles} />;
    case "image":
      return <ImageElement element={element} styles={styles} />;
    default:
      return <div>Unsupported element type: {element.elmType}</div>;
  }
};

export default SwitchCaseElement;
