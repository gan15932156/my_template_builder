import { nanoid } from "nanoid";
import { TBlueprint, TBlueprintElement, TStyle } from "../../blockManager/type";
import { ID_LENGTH } from "@/Features/blueprint/constants";
import { findAndRemove } from "./handleDragDropEvent";

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
