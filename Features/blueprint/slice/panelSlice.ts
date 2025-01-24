import { RootState } from "@/libs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PanelState {
  currentPanel: string;
}

const initialState: PanelState = {
  currentPanel: "block",
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    changePanel: (state, action: PayloadAction<string>) => {
      state.currentPanel = action.payload;
    },
  },
});

export default panelSlice.reducer;
export const { changePanel } = panelSlice.actions;
export const selectCurrentPanel = (state: RootState) =>
  state.panel.currentPanel;
