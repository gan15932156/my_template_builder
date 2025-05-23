import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBlueprint } from "../features/blockManager/type";
import { RootState } from "@/libs/store";

interface BlueprintState {
  blueprint: TBlueprint | null; // Explicitly define as `null` if it can be empty
  selectedElementId: string;
  duplicateElementId: string | null;
  layoutSelectedElementId: string;
}
const initialState: BlueprintState = {
  blueprint: null, // Ensures it's defined
  selectedElementId: "",
  duplicateElementId: null,
  layoutSelectedElementId: "",
};

export const ElementlSlice = createSlice({
  name: "element",
  initialState,
  reducers: {
    updateElement: (state, action: PayloadAction<TBlueprint>) => {
      state.blueprint = action.payload;
    },
    updateStyle: (
      state,
      action: PayloadAction<{
        elementId: string;
        styleState: string;
        property: string;
        newValue: string;
      }>
    ) => {
      if (!state.blueprint) return;

      const { elementId, styleState, property, newValue } = action.payload;
      const blueprintStyles = state.blueprint.styles ?? {};

      if (!blueprintStyles[elementId]) {
        blueprintStyles[elementId] = {};
      }
      if (!blueprintStyles[elementId][styleState]) {
        blueprintStyles[elementId][styleState] = {};
      }

      blueprintStyles[elementId][styleState][property] = newValue;
      state.blueprint.styles = blueprintStyles;
    },
    resetState: () => initialState,
    clearStyleProperty: (
      state,
      action: PayloadAction<{
        elementId: string;
        styleState: string;
        property: string;
      }>
    ) => {
      if (!state.blueprint) return;

      const { elementId, styleState, property } = action.payload;
      const blueprintStyles = state.blueprint.styles ?? {};
      delete blueprintStyles[elementId][styleState][property];
      state.blueprint.styles = blueprintStyles;
    },
    setSelectedElement: (state, action: PayloadAction<string>) => {
      state.selectedElementId = action.payload;
    },
    setDuplicateElementId: (state, action: PayloadAction<string | null>) => {
      state.duplicateElementId = action.payload;
    },
    setLayoutSelectedElement: (state, action: PayloadAction<string>) => {
      state.layoutSelectedElementId = action.payload;
    },
  },
});
export default ElementlSlice.reducer;
export const {
  updateElement,
  updateStyle,
  resetState,
  clearStyleProperty,
  setSelectedElement,
  setDuplicateElementId,
  setLayoutSelectedElement,
} = ElementlSlice.actions;
export const selectBlueprint = (state: RootState) => state.element.blueprint;
export const selectSelectedElementId = (state: RootState) =>
  state.element.selectedElementId;
export const selectDuplicateElementId = (state: RootState) =>
  state.element.duplicateElementId;
export const selectLayoutSelectedElementId = (state: RootState) =>
  state.element.layoutSelectedElementId;
