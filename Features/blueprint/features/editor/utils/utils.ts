import { nanoid } from "nanoid";
import { TBlueprint, TBlueprintElement, TStyle } from "../../blockManager/type";
import { ID_LENGTH } from "@/Features/blueprint/constants";

export function copyBlueprint(element: TBlueprint): TBlueprint {
  const newStyles: TStyle = {};
  let tempStyles: TStyle = { ...element.styles };
  function travelAllElement(element: TBlueprintElement): TBlueprintElement {
    let newElementId = nanoid(ID_LENGTH);
    const newContent = Array.isArray(element.content)
      ? element.content.map((item) => travelAllElement(item))
      : element.content;
    if (tempStyles[element.id]) {
      newStyles[newElementId] = tempStyles[element.id];
    }
    return {
      id: newElementId,
      category: element.category,
      elmType: element.elmType,
      tag: element.tag,
      content: newContent,
      attributes: element.attributes,
      isListing: element.isListing,
      isRand: element.isRand,
    };
  }
  if (element.element) {
    const copiedElement = travelAllElement(element.element);
    return {
      id: element.id,
      name: element.name,
      category: element.category,
      isBlueprint: element.isBlueprint,
      imageUrl: element.imageUrl,
      styles: newStyles,
      element: copiedElement,
    };
  }
  throw new Error("Blueprint element is missing");
}
