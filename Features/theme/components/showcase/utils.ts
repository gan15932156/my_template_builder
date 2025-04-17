import { TElmType } from "@/Features/blueprint/constants";
import {
  CSSProperties,
  ElementStyles,
  ThemeStyle,
  ThemeStyle2,
  VariantStyles,
} from "../../types";
import { StyleInfo } from "../../hooks/useManageTheme";
export type TElementStyles = {
  base: VariantStyles;
} & Partial<Record<TElmType, ElementStyles | VariantStyles>>;
const test: TElementStyles = {
  base: {
    normal: {
      "padding-e;ft": "2rem",
    },
  },
  box: {
    base: {
      normal: {
        padding: "1rem",
      },
    },
    div: {
      normal: {
        border: "1px solid red",
      },
    },
  },
};
export function parseStyles(styles: ThemeStyle2 | null): TElementStyles | null {
  if (styles) {
    return test;
  }
  return null;
}
const test2: ThemeStyle2 = {
  base: {
    normal: {
      padding: "2rem",
    },
  },
  box: {
    base: {
      normal: {
        padding: "1rem",
      },
    },
    div: {
      normal: {
        "padding-top": "1rem",
      },
    },
  },
};

export function getPropertyValue(
  styles: ThemeStyle2 | null,
  styleInfo: StyleInfo,
  propertyName: string
) {
  if (styleInfo.elmType === "base") {
    return styles?.[styleInfo.elmType]?.[styleInfo.state]?.[propertyName] ?? "";
  } else {
    const rel = styles?.[styleInfo.elmType]?.[styleInfo.tag]?.[
      styleInfo.state
    ] as CSSProperties;
    return rel && rel.hasOwnProperty(propertyName) ? rel[propertyName] : "";
  }
}
