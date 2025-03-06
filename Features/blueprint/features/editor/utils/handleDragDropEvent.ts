import { dragElementRule } from "@/Features/blueprint/constants/dragElementRule";
import {
  TBasicBlock,
  TBlueprint,
  TBlueprintElement,
  TBlueprintElementWithStyle,
  TBlueprintRefElement,
  TStyle,
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
    insertElement: TBlueprint | TBlueprintElementWithStyle
  ): TBlueprintElement => {
    if (element.id === id && Array.isArray(element.content)) {
      if ("isBlueprint" in insertElement) {
        return {
          ...element,
          content: [...element.content, insertElement.element ?? []].flat(),
        };
      } else {
        const { styles, ...rest } = insertElement;
        return {
          ...element,
          content: [...element.content, rest],
        };
      }
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

  const copiedElement: TBlueprint | TBlueprintElementWithStyle =
    newElement.isBlueprint
      ? copyBlueprint(newElement as TBlueprint)
      : getBasicBlockElementData2(newElement as TBasicBlock);

  const updatedBlueprint = {
    ...blueprint,
    styles:
      "styles" in copiedElement
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

  const { styles, ...rest } = getBasicBlockElementData2(
    newElement as TBasicBlock
  );
  return {
    ...blueprint,
    element: rest ? { ...rest } : undefined,
    styles: styles ? { ...styles } : undefined,
  };
};
type TreeNode = TBlueprintElement;

export function findAndRemove(
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

function findParent2(
  nodes: TBlueprintElement,
  overId: string,
  parentElementId: string | null = null
): string | null {
  if (nodes.id === overId) {
    return parentElementId; // Return the found parent ID
  }

  if (Array.isArray(nodes.content)) {
    for (const node of nodes.content) {
      const found = findParent2(node, overId, nodes.id);
      if (found) return found; // Stop and return once found
    }
  }

  return null; // If not found in this branch, return null
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
type DropSiblingElementFunction = {
  elementType: "ELEMENT" | "BASIC_ELEMENT" | "BLUEPRINT";
  blueprint: TBlueprint;
  overId: string;
  activeId: string | null;
  element: TBlueprintElement[] | TBlueprint | TBasicBlock | null;
  isDropInTopElement: boolean;
};
export const handleDropSiblingElement = ({
  elementType,
  blueprint,
  overId,
  activeId,
  element,
  isDropInTopElement,
}: DropSiblingElementFunction): TBlueprint | null => {
  function findAndInsert(
    nodes: TreeNode[],
    parentId: string,
    overId: string,
    isDropInTopElement: boolean,
    element: TreeNode
  ): boolean {
    for (const node of nodes) {
      if (node.id === parentId && Array.isArray(node.content)) {
        const overIndex = node.content.findIndex((item) => item.id === overId);
        if (overIndex !== -1) {
          if (isDropInTopElement) {
            node.content.splice(overIndex, 0, element); // Insert before `overId`
          } else {
            node.content.splice(overIndex + 1, 0, element); // Insert after `overId`
          }
          return true;
        }
      }

      if (Array.isArray(node.content)) {
        const inserted = findAndInsert(
          node.content,
          parentId,
          overId,
          isDropInTopElement,
          element
        );
        if (inserted) return true;
      }
    }
    return false;
  }

  // Deep clone blueprint
  let tempElement: TBlueprint | undefined;
  try {
    tempElement = structuredClone(blueprint);
  } catch {
    tempElement = JSON.parse(JSON.stringify(blueprint));
  }

  if (!tempElement?.element) return null;

  if (elementType === "ELEMENT") {
    const result = findAndRemove(
      [tempElement.element],
      (node) => node.id === activeId
    );

    const parentElementId = findParent2(tempElement.element, overId);
    if (!result || !parentElementId) {
      console.error("Parent ID missing for ELEMENT insertion", result);
      return null;
    }
    const inserted = findAndInsert(
      [tempElement.element],
      parentElementId,
      overId,
      isDropInTopElement,
      result
    );

    if (!inserted) {
      console.error("Failed to insert ELEMENT", {
        result,
        overId,
        isDropInTopElement,
      });
      return null;
    }
    return tempElement;
  }

  if (elementType === "BLUEPRINT") {
    const copiedElement = copyBlueprint(element as TBlueprint);
    const parentElementId = findParent2(tempElement.element, overId);

    if (!parentElementId || !copiedElement.element) {
      console.error("Invalid parent for BLUEPRINT", {
        parentElementId,
        copiedElement,
      });
      return null;
    }

    const inserted = findAndInsert(
      [tempElement.element],
      parentElementId,
      overId,
      isDropInTopElement,
      copiedElement.element
    );

    if (!inserted) {
      console.error("Failed to insert BLUEPRINT", {
        copiedElement,
        overId,
        isDropInTopElement,
      });
      return null;
    }

    tempElement.styles = { ...tempElement.styles, ...copiedElement.styles };
    return tempElement;
  }

  if (elementType === "BASIC_ELEMENT") {
    const newElementData = getBasicBlockElementData2(element as TBasicBlock);
    const parentElementId = findParent2(tempElement.element, overId);

    if (!parentElementId) {
      console.error("Parent not found for BASIC_ELEMENT", {
        overId,
        newElementData,
      });
      return null;
    }

    const { styles, ...rest } = newElementData;

    const inserted = findAndInsert(
      [tempElement.element],
      parentElementId,
      overId,
      isDropInTopElement,
      rest
    );

    if (!inserted) {
      console.error("Failed to insert BASIC_ELEMENT", {
        newElementData,
        overId,
        isDropInTopElement,
      });
      return null;
    }

    tempElement.styles = { ...tempElement.styles, ...styles };
    return tempElement;
  }

  return null;
};

export const getBasicBlockElementData2 = (
  basicBlock: TBasicBlock
): TBlueprintElementWithStyle => {
  // console.log(basicBlock);
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
    styles: { [elementId]: { ...basicBlock.styles } },
  };
  return elementData;
};
