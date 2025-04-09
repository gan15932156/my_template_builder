import { ColorVar } from "../blueprint/features/blockManager/type";

export type TTheme = {
  id: string;
  name?: string;
  styles?: ThemeStyle;
  colorVars?: ColorVar;
};

export type ThemeStyle = {
  [elmType: string]: {
    [state: string]: {
      [propertyName: string]: string;
    };
  };
};
