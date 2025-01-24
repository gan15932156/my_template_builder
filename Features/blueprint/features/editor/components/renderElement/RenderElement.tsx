"use client";

import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { transformRefElementToBlueprint } from "../../utils/transformData";
import useGetBlueprintBlock from "../../hooks/useGetBlueprintBlock";
import SwitchCaseElement from "./SwitchCaseElement";
import { useMemo } from "react";
import { TBlueprintWithRefElement } from "../../../blockManager/type";

const RenderElement: React.FC = () => {
  const { data: blueprintBlock, isLoading, isError } = useGetBlueprintBlock();
  const currentElement = useAppSelector(selectBlueprint);
  const transformedBlueprint: TBlueprintWithRefElement | undefined =
    useMemo(() => {
      if (currentElement?.element) {
        try {
          const rel = transformRefElementToBlueprint(
            blueprintBlock ?? {},
            currentElement
          );
          return rel;
        } catch (error) {
          let errorMessage = "An unknown error occurred.";

          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.error("error", errorMessage);
          return undefined;
        }
      } else {
        return undefined;
      }
    }, [currentElement]);
  if (!currentElement?.element) {
    return (
      <div>
        <p>No element selected for rendering.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error loading blueprint. Please try again.</p>
      </div>
    );
  }

  if (transformedBlueprint?.element) {
    console.log(transformedBlueprint?.element);
    return (
      <SwitchCaseElement
        element={transformedBlueprint.element}
        styles={transformedBlueprint.styles}
      />
    );
  }

  return (
    <div>
      <p>Error cannot render element.</p>
    </div>
  );
};

export default RenderElement;
