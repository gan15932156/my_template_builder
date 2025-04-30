import { RootState } from "@/libs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PanelState {
  currentPanel: string;
  isUseBorder: boolean;
}

const initialState: PanelState = {
  currentPanel: "block",
  isUseBorder: true,
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    changePanel: (state, action: PayloadAction<string>) => {
      state.currentPanel = action.payload;
    },
    toggleIsUseBorder: (state) => {
      state.isUseBorder = !state.isUseBorder;
    },
    resetPanelState: () => initialState,
  },
});

export default panelSlice.reducer;
export const { resetPanelState, changePanel, toggleIsUseBorder } =
  panelSlice.actions;
export const selectCurrentPanel = (state: RootState) =>
  state.panel.currentPanel;
export const selectIsUseBorder = (state: RootState) => state.panel.isUseBorder;
