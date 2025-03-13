"use client";

import useSelectedElement from "@/Features/blueprint/hooks/useSelectedElement";

const AttributeManager = () => {
  const { selectedElement } = useSelectedElement();
  if (!selectedElement) return null;
  return (
    <div>
      <p>{selectedElement.attributes && "have"}</p>
    </div>
  );
};

export default AttributeManager;
