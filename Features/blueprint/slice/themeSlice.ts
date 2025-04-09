import { StyleInfo } from "@/Features/theme/hooks/useManageTheme";
import { TTheme } from "@/Features/theme/types";
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
      if (!state.theme) return;

      const { styleState, property, newValue } = action.payload;
      const styles = state.theme.styles ?? {};

      if (!styles[styleState.elmType]) {
        styles[styleState.elmType] = {};
      }
      if (!styles[styleState.elmType][styleState.state]) {
        styles[styleState.elmType][styleState.state] = {};
      }

      styles[styleState.elmType][styleState.state][property] = newValue;
      state.theme.styles = styles;
    },
    clearStyleProperty: (
      state,
      action: PayloadAction<{
        styleState: StyleInfo;
        property: string;
      }>
    ) => {
      if (!state.theme) return;

      const { styleState, property } = action.payload;
      const styles = state.theme.styles ?? {};
      delete styles[styleState.elmType][styleState.state][property];
      state.theme.styles = styles;
    },
  },
});

export default ThemeSlice.reducer;
export const { updateTheme, updateStyle, clearStyleProperty } =
  ThemeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.theme;
