import { dragElementRule } from "@/Features/blueprint/constants/dragElementRule";
import {
  TBasicBlock,
  TBlueprint,
  TBlueprintElement,
  TBlueprintElementWithStyle,
} from "../../blockManager/type";
import { CUSTOM_ALPHABET, ID_LENGTH } from "@/Features/blueprint/constants";
import { copyBlueprint } from "./utils";
import { customAlphabet } from "nanoid";
import { DropPosition } from "@/Features/blueprint/hooks/useDragDropEvent";
const nanoid = customAlphabet(CUSTOM_ALPHABET, 10);

export const handleInsertElementToBlueprint = (
  blueprint: TBlueprint,
  newElement: TBlueprint | TBasicBlock
): TBlueprint => {
  if (newElement.isBlueprint) {
    const copiedElement = copyBlueprint(newElement as TBlueprint);
    return {
      ...blueprint,
      element: copiedElement.element ? { ...copiedElement.element } : undefined,
      styles: copiedElement.styles ? { ...copiedElement.styles } : undefined,
    };
  }

  const { styles, ...rest } = getBasicBlockElementData2(
    newElement as TBasicBlock
  );
  // console.log(rest);
  return {
    ...blueprint,
    element: rest ? { ...rest } : undefined,
    styles: styles ? { ...styles } : undefined,
  };
};

const findElement = (
  id: string,
  list: TBlueprintElement[]
): TBlueprintElement | null => {
  for (const el of list) {
    if (el.id === id) return el;
    if (Array.isArray(el.content)) {
      const found = findElement(id, el.content);
      if (found) return found;
    }
  }
  return null;
};
const removeElement = (
  id: string,
  list: TBlueprintElement[]
): TBlueprintElement[] => {
  return list
    .map((el) => {
      if (el.id === id) return null;
      if (Array.isArray(el.content)) {
        return {
          ...el,
          content: removeElement(id, el.content).filter(
            Boolean
          ) as TBlueprintElement[],
        };
      }
      return el;
    })
    .filter(Boolean) as TBlueprintElement[];
};
export const handleDropInElement = (params: {
  dropPosition: DropPosition;
  elementType: "blueprint" | "basic" | "element";
  element: TBlueprint | TBasicBlock | null;
  blueprint: TBlueprint;
  activeId: string;
}) => {
  const insert = (
    list: TBlueprintElement[],
    draggedElement: TBlueprintElement
  ): TBlueprintElement[] => {
    const newList: TBlueprintElement[] = [];
    for (const el of list) {
      if (el.id === dropPosition.targetId) {
        if (dropPosition.position === "top") {
          newList.push(draggedElement);
          newList.push(el);
        } else if (dropPosition.position === "bottom") {
          newList.push(el);
          newList.push(draggedElement);
        } else if (dropPosition.position === "inner") {
          if (Array.isArray(el.content)) {
            newList.push({
              ...el,
              content: [...el.content, draggedElement], // create new object
            });
          } else {
            newList.push(el);
          }
        }
      } else {
        newList.push({
          ...el,
          content: Array.isArray(el.content)
            ? insert(el.content, draggedElement)
            : el.content,
        });
      }
    }
    return newList;
  };
  const { dropPosition, elementType, element, blueprint, activeId } = params;

  if (elementType === "element") {
    if (!blueprint.element) return blueprint;
    const found = findElement(activeId, [blueprint.element]);

    if (!found) return blueprint;
    let updatedBlueprint = removeElement(activeId, [blueprint.element]);
    const inserted = insert(updatedBlueprint, found);
    return {
      ...blueprint,
      element: { ...inserted[0] },
    };
  }
  if (!element) return blueprint;
  if (elementType === "basic") {
    const copiedElement: TBlueprintElementWithStyle = getBasicBlockElementData2(
      element as TBasicBlock
    );
    const { styles, ...rest } = copiedElement;
    const updatedBlueprint = {
      ...blueprint,
      styles: styles ? { ...blueprint.styles, ...styles } : blueprint.styles,
    };
    if (!updatedBlueprint.element) return updatedBlueprint;
    const inserted = insert([updatedBlueprint.element], rest);
    return {
      ...updatedBlueprint,
      element: { ...inserted[0] },
    };
  }
  const copiedElement: TBlueprint = copyBlueprint(element as TBlueprint);
  const { styles, element: blueprintElement, ...rest } = copiedElement;
  const updatedBlueprint = {
    ...blueprint,
    styles: styles ? { ...blueprint.styles, ...styles } : blueprint.styles,
  };
  if (!updatedBlueprint.element || !blueprintElement) return updatedBlueprint;
  const inserted = insert([updatedBlueprint.element], blueprintElement);
  return {
    ...updatedBlueprint,
    element: { ...inserted[0] },
  };
};
export const getBasicBlockElementData2 = (
  basicBlock: TBasicBlock
): TBlueprintElementWithStyle => {
  const elementId = nanoid(ID_LENGTH);
  const elementData: TBlueprintElementWithStyle = {
    id: elementId,
    category: basicBlock.category || "",
    elmType: basicBlock.element.elmType,
    tag: dragElementRule[basicBlock.element.elmType]?.defaultTag || "div",
    attributes: basicBlock.element.attributes || undefined,
    content: basicBlock.element.content,
    isListing: false,
    isRand: false,
    styles: { [elementId]: basicBlock.styles ? { ...basicBlock.styles } : {} },
  };
  return elementData;
};
