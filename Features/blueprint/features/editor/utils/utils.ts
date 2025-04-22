import { customAlphabet } from "nanoid";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  ColorVar,
  DynamicPseudoStyles,
  StyleProperties,
  TBlueprint,
  TBlueprintElement,
  TStyle,
} from "../../blockManager/type";
import { CUSTOM_ALPHABET, ID_LENGTH } from "@/Features/blueprint/constants";
const nanoid = customAlphabet(CUSTOM_ALPHABET, 10);
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

      // don't parsed to color code, use colorVars instead
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
const selfCloseTag = new Set(["input", "img"]);
function generateHTML(element: TBlueprintElement): string {
  function generate(elm: TBlueprintElement): string {
    const { id, content, tag, attributes } = elm;

    // Generate attributes string
    const attrString = Object.entries(attributes ?? {})
      .filter(([key]) => key !== "labelText")
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const attr = attrString ? ` ${attrString}` : "";

    // Handle self-closing tags
    if (selfCloseTag.has(tag)) {
      return `<${tag}${attr} id="${id}" />`;
    }

    // Handle content
    if (tag === "label") {
      const labelText = attributes?.labelText || "";
      return `<${tag}${attr} id="${id}">${labelText}</${tag}>`;
    }

    const innerHTML = Array.isArray(content)
      ? content.map(generate).join("")
      : content;

    return `<${tag}${attr} id="${id}">${innerHTML}</${tag}>`;
  }

  return generate(element);
}
function generateCssProperty(styles: StyleProperties): string {
  let result = "";
  Object.entries(styles).forEach(([key, value]) => {
    if (value.startsWith("@")) {
      const [group, colorKey] = value.slice(1).split(".");
      result += `${key}:var(--${group}-${colorKey});`;
    } else if (value !== "") {
      result += `${key}:${value};`;
    }
  });
  return result;
}
function generateCSS(styles: TStyle, colorVars: ColorVar): string {
  let result = `
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
:root {`;

  // Generate CSS variables from colorVars
  for (const [category, values] of Object.entries(colorVars)) {
    for (const [shade, colorValue] of Object.entries(values)) {
      result += `\n  --${category}-${shade}: ${colorValue};`;
    }
  }

  result += `\n}\n`;

  // Generate styles for each element ID
  for (const [id, elementStyles] of Object.entries(styles)) {
    if (Object.keys(elementStyles).length === 0) continue;

    const states = Object.entries(elementStyles).filter(
      ([, styles]) => Object.keys(styles).length > 0
    );

    if (states.length === 0) continue;

    let css = `#${id} {\n`;
    let pseudoStyles = "";

    for (const [state, stateStyles] of states) {
      const props = generateCssProperty(stateStyles);
      if (state === "normal") {
        css += props;
      } else {
        pseudoStyles += `  &:${state} {\n${props}  }\n`;
      }
    }

    css += pseudoStyles + `}\n`;
    result += css;
  }
  return result;
}
export async function downloadCodeZip(blueprint: TBlueprint) {
  const zip = new JSZip();

  if (blueprint.element) {
    const result = generateHTML(blueprint.element);
    const html = ` <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="style.css">
      <title>Sample Page</title>
    </head>
    <body>
     ${result}
    </body>
    </html>`;
    zip.file("index.html", html);
  }
  if (blueprint.styles) {
    const css = generateCSS(blueprint.styles, blueprint.colorVars);
    zip.file("style.css", css);
  }

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "web-template.zip");
}
