import counterReducer from "@/Features/blueprint/slice/counterSlice";
import panelReducer from "@/Features/blueprint/slice/panelSlice";
import elementReducer from "@/Features/blueprint/slice/elementSlice";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      element: elementReducer,
      panel: panelReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
