"use client";

import { RenderElementProps } from "./SwitchCaseElement";

const ImageElement: React.FC<RenderElementProps> = ({ element, styles }) => {
  return <img src={(element.attributes?.src as string) || ""} />;
};

export default ImageElement;
