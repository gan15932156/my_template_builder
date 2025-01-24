import { dragElementRule } from "@/Features/blueprint/constants/dragElementRule";
import {
  TBasicBlock,
  TBlueprint,
  TBlueprintElement,
  TBlueprintRefElement,
} from "../../blockManager/type";
import { nanoid } from "nanoid";
import { ID_LENGTH } from "@/Features/blueprint/constants";
export const insertElementToBlueprint = (
  blueprint: TBlueprint,
  newElement: TBlueprint | TBasicBlock
): TBlueprint => {
  return blueprint;
};
export const handleInsertElementToElement = (
  blueprint: TBlueprint,
  newElement: TBlueprint | TBasicBlock,
  parentElementId: string,
  insertIntro: number = -1
): TBlueprint => {
  // 1. find parent element
  // 2. update styles property, if have
  // 3. update parent element(insert new element) by index
  // 4. return new blueprint
  return blueprint;
};

export const handleInsertElementToBlueprint = (
  blueprint: TBlueprint,
  newElement: TBlueprint | TBasicBlock
): TBlueprint => {
  if (newElement.isBlueprint) {
    const newRefElement: TBlueprintRefElement = {
      type: "refElement",
      id: nanoid(ID_LENGTH),
      isShowElm: true,
      refId: newElement.id,
      isUseRef: true,
      category: newElement.category || "",
    };
    const newBlueprint: TBlueprint = {
      ...blueprint,
      element: { ...newRefElement },
    };
    return newBlueprint;
  } else {
    const newElementData = getBasicBlockElementData(newElement as TBasicBlock);
    const newBlueprint: TBlueprint = {
      ...blueprint,
      element: { ...newElementData },
    };
    return newBlueprint;
  }
};
/**
 * drag use case
 * #1. Drag block to blueprint new
 * 2. Drag block to element new
 * 3. Drag block to top of element new
 * 4. Drag block to bottom of element new
 * #5. Drag blueprint block to blueprint new
 * 6. Drag blueprint block to element new
 * 7. Drag blueprint block to top of element new
 * 8. Drag blueprint block to bottom of element new
 * 9. Drag element to another element update transfer position or level of element
 * 10. Drag element to top of another element update
 * 11. Drag element to bottom of another element update
 */

const getBasicBlockElementData = (
  basicBlock: TBasicBlock
): TBlueprintElement => {
  // console.log(basicBlock);
  const elementData: TBlueprintElement = {
    type: "element",
    id: nanoid(ID_LENGTH),
    category: basicBlock.category || "",
    elmType: basicBlock.element.elmType,
    tag: dragElementRule[basicBlock.element.elmType]?.defaultTag || "div",
    attributes: basicBlock.element.attributes || undefined,
    content: basicBlock.element.content,
  };
  return elementData;
};
