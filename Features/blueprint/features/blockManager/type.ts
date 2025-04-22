// https://odoe.net/blog/ts-hashmaps for hashmap
// Shared base type for common fields
type TBaseBlock = {
  id: string;
  name?: string;
  category?: string;
  isBlueprint: boolean;
};

export type StyleProperties = {
  [property: string]: string; // CSS properties as key-value pairs
};

export type DynamicPseudoStyles = {
  [pseudoOrState: string]: StyleProperties; // Allow any string key for states or pseudo-classes
};

export type TStyle = {
  [elementId: string]: DynamicPseudoStyles; // Element IDs map to their dynamic styles
};

// Basic block definition
export type TBasicBlock = TBaseBlock & {
  icon?: string; // Icon representing the block
  styles?: DynamicPseudoStyles; // Optional styles
  element: {
    elmType: string; // Element type
    content: string | []; // Element content (e.g., innerHTML)
    attributes?: Record<string, string | string[]>;
  };
};

export type Attributes = Record<string, string | string[]>;

export type TBlueprintElement = {
  id: string; // Unique ID
  category: string; // Element category
  elmType: string; // Element type
  tag: string;
  isListing: boolean;
  isRand: boolean;
  attributes?: Attributes;
  content: Array<TBlueprintElement> | string;
};

export type ColorVar = {
  background: {
    default: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  error: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  warning: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  info: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  success: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  divider: {
    divider: string;
  };
};

export type ColorVarV2 = {
  [colorName: string]: {
    [name: string]: string;
  };
};

export type TBlueprintElementWithStyle = TBlueprintElement & {
  styles?: TStyle;
};

export type TBlueprint = TBaseBlock & {
  imageUrl?: string; // URL of the blueprint image
  styles?: TStyle; // Optional styles
  element?: TBlueprintElement; // Element
  colorVars: ColorVar;
};

export type TBlueprintWithoutElement = TBaseBlock & {
  imageUrl?: string; // URL of the blueprint image
};

export interface HashMap<T> {
  [key: string]: T;
}
