import { StyleInfo } from "@/Features/theme/hooks/useManageTheme";
import {
  CSSProperties,
  ElementStyles,
  TTheme,
  VariantStyles,
} from "@/Features/theme/types";
import { RootState } from "@/libs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: TTheme | null;
}
const initialState: ThemeState = {
  theme: null,
};

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<TTheme>) => {
      state.theme = action.payload;
    },
    updateStyle: (
      state,
      action: PayloadAction<{
        styleState: StyleInfo;
        property: string;
        newValue: string;
      }>
    ) => {
      const { styleState, property, newValue } = action.payload;
      if (!state.theme) return;

      // Ensure `styles` exists
      if (!state.theme.styles) {
        state.theme.styles = {
          base: {},
        };
      }

      const styles = state.theme.styles;

      if (!styles[styleState.elmType]) {
        styles[styleState.elmType] =
          styleState.elmType === "base" ? {} : { base: {} };
      }

      if (
        styleState.elmType === "base" ||
        !("base" in styles[styleState.elmType])
      ) {
        const variantStyles = styles[styleState.elmType] as VariantStyles;

        if (!variantStyles[styleState.state]) {
          variantStyles[styleState.state] = {};
        }

        variantStyles[styleState.state][property] = newValue;
      } else {
        const elementStyles = styles[styleState.elmType] as ElementStyles;

        if (!elementStyles[styleState.tag]) {
          elementStyles[styleState.tag] = {};
        }

        if (!elementStyles[styleState.tag][styleState.state]) {
          elementStyles[styleState.tag][styleState.state] = {};
        }

        elementStyles[styleState.tag][styleState.state][property] = newValue;
      }
    },
    resetThemeData: () => initialState,
    clearStyleProperty: (
      state,
      action: PayloadAction<{
        styleState: StyleInfo;
        property: string;
      }>
    ) => {
      if (!state.theme) return;

      const { styleState, property } = action.payload;
      const styles = state.theme.styles;
      if (styleState.elmType === "base") {
        delete styles?.base?.[styleState.state]?.[property];
      } else {
        const rel = styles?.[styleState.elmType]?.[styleState.tag]?.[
          styleState.state
        ] as CSSProperties;
        delete rel[property];
      }
      state.theme.styles = styles;
    },
  },
});

export default ThemeSlice.reducer;
export const { resetThemeData, updateTheme, updateStyle, clearStyleProperty } =
  ThemeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.theme;
