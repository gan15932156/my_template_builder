"use client";

import { useAppSelector } from "@/hooks/reduxHooks";
import LayoutAccordion from "./LayoutAccordion";
import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";

const LayoutManager = () => {
  const currentBlueprint = useAppSelector(selectBlueprint);
  if (!currentBlueprint) return null;
  if (!currentBlueprint.element) return null;
  return (
    <div>
      <LayoutAccordion element={currentBlueprint.element} />
    </div>
  );
};

export default LayoutManager;
