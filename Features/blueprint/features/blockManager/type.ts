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
  colorVars?: ColorVar;
};

export type TBlueprintWithoutElement = TBaseBlock & {
  imageUrl?: string; // URL of the blueprint image
};

export interface HashMap<T> {
  [key: string]: T;
}

export const mockData: TBlueprint = {
  id: "blueprint1",
  name: "Example Blueprint",
  category: "layout",
  isBlueprint: true,
  styles: {
    card1: {
      normal: {
        "background-color": "white",
        padding: "1rem",
        "box-shadow": "0px 4px 6px rgba(0,0,0,0.1)",
        "border-radius": "1rem",
      },
      hover: {
        "box-shadow": "0px 6px 10px rgba(0,0,0,0.15)",
      },
      "nth(2)": {
        color: "red",
      },
    },
  },
  element: {
    id: "card1",
    category: "box",
    elmType: "box",
    tag: "div",
    isListing: true,
    isRand: false,
    content: [
      {
        id: "field1",
        category: "textField",
        elmType: "input",
        tag: "input",
        isListing: false,
        isRand: false,
        content: "",
        attributes: {
          type: "text",
          placeholder: "input here",
        },
      },
    ],
  },
};

export const mockData2 = {
  id: "cm55a32680000gwwhmjw0utv7",
  name: "card2",
  category: "card",
  isBlueprint: true,
  styles: {
    cardWrapper1: {
      normal: {
        "background-color": "white",
        padding: "1rem",
        "box-shadow": "0px 4px 6px rgba(0,0,0,0.1)",
        "border-radius": "1rem",
      },
      hover: {
        "box-shadow": "0px 6px 10px rgba(0,0,0,0.15)",
      },
    },
    image1: {
      normal: {
        "background-color": "red",
        "object-fit": "cover",
        "max-width": "100%",
      },
    },
    text2: {
      normal: {
        color: "blue",
        "font-size": "2rem",
      },
    },
  },
  element: {
    type: "element",
    id: "cardWrapper1",
    category: "box",
    elmType: "box",
    tag: "div",
    content: [
      {
        type: "element",
        id: "image1",
        category: "image",
        elmType: "image",
        tag: "img",
        content: "",
        attributes: {
          src: "https://placehold.co/600x400",
        },
      },
      {
        type: "element",
        id: "wapper2",
        category: "box",
        elmType: "box",
        tag: "section",
        content: [
          {
            type: "element",
            id: "text2",
            category: "text",
            elmType: "text",
            tag: "h1",
            content: "test tesacedrf heading",
          },
        ],
      },
    ],
  },
};
