import { ColorVar } from "../blueprint/features/blockManager/type";

export type TTheme = {
  id: string;
  name?: string;
  styles?: ThemeStyle2;
  colorVars?: ColorVar;
};

export type ThemeStyle = {
  [elmType: string]: {
    [state: string]: {
      [propertyName: string]: string;
    };
  };
};

export type CSSProperties = Record<string, string>;

export type VariantStyles = {
  [variant: string]: CSSProperties;
};

export type ElementStyles = {
  base: VariantStyles;
  [styleCategory: string]: VariantStyles; // e.g., h1, p, label, etc.
};

export type ThemeStyle2 = {
  base: VariantStyles;
  [elementType: string]: ElementStyles | VariantStyles;
};
