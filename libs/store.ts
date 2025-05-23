import panelReducer from "@/Features/blueprint/slice/panelSlice";
import elementReducer from "@/Features/blueprint/slice/elementSlice";
import elementToolStateReducer from "@/Features/blueprint/slice/elementToolStateSlice";
import themeReducer from "@/Features/blueprint/slice/themeSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      element: elementReducer,
      tool: elementToolStateReducer,
      panel: panelReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
