import { dragElementRule } from "@/Features/blueprint/constants/dragElementRule";
import {
  TBasicBlock,
  TBlueprint,
  TBlueprintElement,
  TBlueprintRefElement,
} from "../../blockManager/type";
import { nanoid } from "nanoid";
import { ID_LENGTH } from "@/Features/blueprint/constants";
import { copyBlueprint } from "./utils";

export const handleInsertElementToElement = (
  blueprint: TBlueprint,
  newElement: TBlueprint | TBasicBlock,
  parentElementId: string
): TBlueprint => {
  const findAndInsertElement = (
    id: string,
    element: TBlueprintElement,
    insertElement: TBlueprint | TBlueprintElement
  ): TBlueprintElement => {
    if (element.id === id && Array.isArray(element.content)) {
      return {
        ...element,
        content:
          "isBlueprint" in insertElement
            ? [...element.content, insertElement.element ?? []].flat()
            : [...element.content, insertElement],
      };
    }

    return {
      ...element,
      content: Array.isArray(element.content)
        ? element.content.map((item) =>
            findAndInsertElement(id, item, insertElement)
          )
        : element.content,
    };
  };

  const copiedElement: TBlueprint | TBlueprintElement = newElement.isBlueprint
    ? copyBlueprint(newElement as TBlueprint)
    : getBasicBlockElementData(newElement as TBasicBlock);

  const updatedBlueprint = {
    ...blueprint,
    styles:
      newElement.isBlueprint && "styles" in copiedElement
        ? { ...blueprint.styles, ...copiedElement.styles }
        : blueprint.styles,
  };

  if (!blueprint.element) {
    throw new Error("Blueprint element is missing");
  }

  return {
    ...updatedBlueprint,
    element: findAndInsertElement(
      parentElementId,
      blueprint.element,
      copiedElement
    ),
  };
};

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

  const newElementData = getBasicBlockElementData(newElement as TBasicBlock);
  return {
    ...blueprint,
    element: { ...newElementData },
  };
};
type TreeNode = TBlueprintElement;

function findAndRemove(
  nodes: TreeNode[],
  predicate: (node: TreeNode) => boolean
): TreeNode | null {
  for (let i = 0; i < nodes.length; i++) {
    if (predicate(nodes[i])) {
      const removed = nodes[i];
      nodes.splice(i, 1);
      return removed;
    }
    if (Array.isArray(nodes[i].content)) {
      const found = findAndRemove(nodes[i].content as TreeNode[], predicate);
      if (found) return found;
    }
  }
  return null;
}

export const handleChangeElement = (
  id: string,
  newParentId: string,
  tree: TBlueprintElement[]
) => {
  const element = findAndRemove(tree, (node) => node.id === id);
  if (!element) return false;

  function findAndInsert(
    nodes: TreeNode[],
    parentId: string,
    element: TreeNode
  ): boolean {
    for (const node of nodes) {
      if (node.id === parentId && Array.isArray(node.content)) {
        node.content.push(element);
        return true;
      }
      if (Array.isArray(node.content)) {
        const inserted = findAndInsert(node.content, parentId, element);
        if (inserted) return true;
      }
    }
    return false;
  }

  return findAndInsert(tree, newParentId, element);
};
/**
 * drag use case
 * #1. Drag block to blueprint new
 * #2. Drag block to element new
 * 3. Drag block to top of element new
 * 4. Drag block to bottom of element new
 * #5. Drag blueprint block to blueprint new
 * #6. Drag blueprint block to element new
 * 7. Drag blueprint block to top of element new
 * 8. Drag blueprint block to bottom of element new
 * #9. Drag element to another element update transfer position or level of element
 * 10. Drag element to top of another element update
 * 11. Drag element to bottom of another element update
 */

const getBasicBlockElementData = (
  basicBlock: TBasicBlock
): TBlueprintElement => {
  // console.log(basicBlock);
  const elementData: TBlueprintElement = {
    id: nanoid(ID_LENGTH),
    category: basicBlock.category || "",
    elmType: basicBlock.element.elmType,
    tag: dragElementRule[basicBlock.element.elmType]?.defaultTag || "div",
    attributes: basicBlock.element.attributes || undefined,
    content: basicBlock.element.content,
    isListing: false,
    isRand: false,
  };
  return elementData;
};
