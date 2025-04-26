import { RootState } from "@/libs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TooltipState = {
  isActive: boolean;
  canInsertElement: boolean;
  position: {
    x: number;
    y: number;
  };
};
interface ToolState {
  tooltip: TooltipState;
}
const initialTooltipState: TooltipState = {
  isActive: false,
  canInsertElement: false,
  position: {
    x: 0,
    y: 0,
  },
};
const initialState: ToolState = {
  tooltip: { ...initialTooltipState },
};

export const ElementToolStateSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    setTooltip: (state, action: PayloadAction<TooltipState>) => {
      state.tooltip = action.payload;
    },
    clearTooltip: (state) => {
      state.tooltip = initialTooltipState;
    },
  },
});

export default ElementToolStateSlice.reducer;
export const selectElementTooltipState = (state: RootState) =>
  state.tool.tooltip;
export const { setTooltip, clearTooltip } = ElementToolStateSlice.actions;
