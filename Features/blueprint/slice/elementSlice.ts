import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBlueprint } from "../features/blockManager/type";
import { RootState } from "@/libs/store";

interface BlueprintState {
  blueprint?: TBlueprint;
  selectedElementId: string;
  layoutSelectedElementId: string;
}
const initialState: BlueprintState = {
  selectedElementId: "",
  layoutSelectedElementId: "",
};

export const ElementlSlice = createSlice({
  name: "element",
  initialState,
  reducers: {
    updateElement: (state, action: PayloadAction<TBlueprint>) => {
      state.blueprint = action.payload;
    },
    setSelectedElement: (state, action: PayloadAction<string>) => {
      state.selectedElementId = action.payload;
    },
    setLayoutSelectedElement: (state, action: PayloadAction<string>) => {
      state.layoutSelectedElementId = action.payload;
    },
  },
});
export default ElementlSlice.reducer;
export const { updateElement, setSelectedElement, setLayoutSelectedElement } =
  ElementlSlice.actions;
export const selectBlueprint = (state: RootState) => state.element.blueprint;
export const selectSelectedElementId = (state: RootState) =>
  state.element.selectedElementId;
export const selectLayoutSelectedElementId = (state: RootState) =>
  state.element.layoutSelectedElementId;
