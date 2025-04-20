import { nanoid } from "nanoid";
import {
  DynamicPseudoStyles,
  TBlueprint,
  TBlueprintElement,
  TStyle,
} from "../../blockManager/type";
import { ID_LENGTH } from "@/Features/blueprint/constants";
import { parseColorVariableToValue } from "./transformData";

export function copyBlueprint(blueprint: TBlueprint): TBlueprint {
  const newStyles: TStyle = {};
  let tempStyles: TStyle = { ...blueprint.styles };
  function travelAllElement(element: TBlueprintElement): TBlueprintElement {
    let newElementId = nanoid(ID_LENGTH);
    const newContent = Array.isArray(element.content)
      ? element.content.map((item) => travelAllElement(item))
      : element.content;
    if (tempStyles[element.id]) {
      // if (blueprint.colorVars) {
      //   const rel = parseColorVariableToValue(
      //     tempStyles[element.id],
      //     blueprint.colorVars
      //   );
      //   newStyles[newElementId] = rel;
      // } else {
      //   newStyles[newElementId] = tempStyles[element.id];
      // }
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
  if (blueprint.element) {
    const copiedElement = travelAllElement(blueprint.element);
    return {
      id: blueprint.id,
      name: blueprint.name,
      category: blueprint.category,
      isBlueprint: blueprint.isBlueprint,
      imageUrl: blueprint.imageUrl,
      styles: newStyles,
      element: copiedElement,
      colorVars: blueprint.colorVars,
    };
  }
  throw new Error("Blueprint element is missing");
}

export function findElement(
  elementId: string,
  currentElement?: TBlueprintElement
): TBlueprintElement | null {
  if (!currentElement) return null;
  if (currentElement.id === elementId) {
    return currentElement;
  }
  if (Array.isArray(currentElement.content)) {
    for (const node of currentElement.content) {
      const found = findElement(elementId, node);
      if (found) return found;
    }
  }
  return null;
}

function findAndDelete(
  element: TBlueprintElement,
  targetId: string
): {
  updatedElement: TBlueprintElement | null;
  removedElement: TBlueprintElement | null;
} {
  if (element.id === targetId)
    return { updatedElement: null, removedElement: element };

  let removedElement: TBlueprintElement | null = null;
  if (Array.isArray(element.content)) {
    element.content = element.content
      .map((child) => {
        const result = findAndDelete(child, targetId);
        if (result.removedElement) removedElement = result.removedElement;
        return result.updatedElement;
      })
      .filter((child): child is TBlueprintElement => child !== null);
  }

  return { updatedElement: element, removedElement };
}

export function deleteElement(
  elementId: string,
  currentBlueprint: TBlueprint
): TBlueprint {
  function travelElementAndDeleteStyle(element: TBlueprintElement) {
    if (tempStyles.hasOwnProperty(element.id)) {
      delete tempStyles[element.id];
    }
    if (Array.isArray(element.content) && element.content.length > 0) {
      for (const node of element.content) {
        travelElementAndDeleteStyle(node);
      }
    }
  }

  let tempElement: TBlueprint | undefined;
  try {
    tempElement = structuredClone(currentBlueprint);
  } catch {
    tempElement = JSON.parse(JSON.stringify(currentBlueprint));
  }
  if (!tempElement?.element) return currentBlueprint;
  const { removedElement, updatedElement } = findAndDelete(
    tempElement.element,
    elementId
  );
  let tempStyles: TStyle = JSON.parse(JSON.stringify(tempElement.styles));
  if (removedElement) {
    travelElementAndDeleteStyle(removedElement);
  }
  tempElement = {
    ...tempElement,
    styles: { ...tempStyles },
    element: updatedElement ? { ...updatedElement } : undefined,
  };
  return tempElement;
}
export function updateElementAttr(
  elementId: string,
  name: string,
  values: string | string[],
  currentBlueprint: TBlueprint
): TBlueprint {
  function findAndUpdate(
    element: TBlueprintElement,
    targetId: string,
    name: string,
    values: string | string[]
  ): TBlueprintElement {
    if (element.id === targetId) {
      return {
        ...element,
        attributes: { ...element.attributes, [name]: values },
      };
    }

    return {
      ...element,
      content: Array.isArray(element.content)
        ? element.content.map((item) =>
            findAndUpdate(item, targetId, name, values)
          )
        : element.content,
    };
  }
  let tempElement: TBlueprint | undefined;
  try {
    tempElement = structuredClone(currentBlueprint);
  } catch {
    tempElement = JSON.parse(JSON.stringify(currentBlueprint));
  }
  if (!tempElement?.element) return currentBlueprint;
  return {
    ...currentBlueprint,
    element: findAndUpdate(tempElement?.element, elementId, name, values),
  };
}
export function updateElementProperty<T>(
  elementId: string,
  name: string,
  values: T,
  currentBlueprint: TBlueprint
): TBlueprint {
  function findAndUpdate<T>(
    element: TBlueprintElement,
    targetId: string,
    name: string,
    values: T
  ): TBlueprintElement {
    if (element.id === targetId) {
      // update here
      return { ...element, [name]: values };
    }

    return {
      ...element,
      content: Array.isArray(element.content)
        ? element.content.map((item) =>
            findAndUpdate(item, targetId, name, values)
          )
        : element.content,
    };
  }
  let tempElement: TBlueprint | undefined;
  try {
    tempElement = structuredClone(currentBlueprint);
  } catch {
    tempElement = JSON.parse(JSON.stringify(currentBlueprint));
  }
  if (!tempElement?.element) return currentBlueprint;
  return {
    ...currentBlueprint,
    element: findAndUpdate(tempElement?.element, elementId, name, values),
  };
}
export function updateElementContent(
  elementId: string,
  value: string,
  currentBlueprint: TBlueprint
): TBlueprint {
  function findAndUpdate<T>(
    element: TBlueprintElement,
    targetId: string,
    value: string
  ): TBlueprintElement {
    if (element.id === targetId) {
      // update here
      return { ...element, content: value };
    }

    return {
      ...element,
      content: Array.isArray(element.content)
        ? element.content.map((item) => findAndUpdate(item, targetId, value))
        : element.content,
    };
  }
  let tempElement: TBlueprint | undefined;
  try {
    tempElement = structuredClone(currentBlueprint);
  } catch {
    tempElement = JSON.parse(JSON.stringify(currentBlueprint));
  }
  if (!tempElement?.element) return currentBlueprint;
  return {
    ...currentBlueprint,
    element: findAndUpdate(tempElement?.element, elementId, value),
  };
}
export function getIsHorizontalChild(
  styles: DynamicPseudoStyles | undefined
): boolean {
  let result = true;
  if (!styles) {
    result = true;
  } else {
    if (styles.hasOwnProperty("normal")) {
      if (
        styles["normal"]?.["display"] &&
        styles["normal"]["display"] == "flex"
      ) {
        if (
          styles["normal"]?.["flex-direction"] &&
          styles["normal"]["flex-direction"] == "column"
        ) {
          result = true;
        } else {
          result = false;
        }
      }
    }
  }

  return result;
}
type TreeNode = TBlueprintElement;

export function duplicateElement(
  blueprint: TBlueprint,
  selectedElement: TBlueprintElement,
  duplicateElementId: string
): TBlueprint {
  const newStyles: TStyle = {};
  let tempStyles: TStyle = { ...blueprint.styles };
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
  function copyElement(element: TBlueprintElement): TBlueprintElement {
    let newElementId = nanoid(ID_LENGTH);
    const newContent = Array.isArray(element.content)
      ? element.content.map((item) => copyElement(item))
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

  if (!blueprint?.element) return blueprint;
  let tempElement: TBlueprint;
  try {
    tempElement = structuredClone(blueprint);
  } catch {
    tempElement = JSON.parse(JSON.stringify(blueprint));
  }
  const foundElement = findElement(duplicateElementId, tempElement.element);
  if (!foundElement || !tempElement.element) return blueprint;
  const copiedElement = copyElement(foundElement);
  tempStyles = {
    ...tempStyles,
    ...newStyles,
  };
  if (findAndInsert([tempElement.element], selectedElement.id, copiedElement)) {
    return {
      ...tempElement,
      styles: tempStyles,
    };
  }
  return blueprint;
}
