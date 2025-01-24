import StoreProvider from "@/providers/StoreProvider";
import React from "react";

function BlueprintLayout({ children }: { children: React.ReactNode }) {
  // https://redux-toolkit.js.org/usage/nextjs
  return <StoreProvider>{children}</StoreProvider>;
}

export default BlueprintLayout;
