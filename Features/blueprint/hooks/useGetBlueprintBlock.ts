"use client";

import { ApiResponse, TBlueprintWithElement } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { HashMap, TBlueprint } from "../features/blockManager/type";
import { useCallback } from "react";
import { transformToTBlueprint } from "../features/editor/utils/transformData";
// https://tkdodo.eu/blog/react-query-as-a-state-manager
// https://dev.to/franklin030601/managing-state-with-react-query-1842
const fetchBlueprint = async (): Promise<
  ApiResponse<TBlueprintWithElement[]>
> => {
  const apiPath = `/api/blueprint/block`;
  return fetch(apiPath, { method: "GET", cache: "no-store" }).then((response) =>
    response.json()
  );
};
const transformBlueprint = (
  blueprints: TBlueprintWithElement[]
): HashMap<HashMap<TBlueprint>> => {
  const blockCategories: HashMap<HashMap<TBlueprint>> = {};
  blockCategories["other"] = {}; // Initialize "other" category
  blueprints.forEach((blueprint) => {
    if (blueprint.element != null) {
      try {
        const transformedBlueprint = transformToTBlueprint({
          ...blueprint,
          isBlueprint: true,
        });

        const category = transformedBlueprint.category ?? "other";
        if (!blockCategories[category]) {
          blockCategories[category] = {}; // Initialize category if not present
        }

        blockCategories[category][transformedBlueprint.id] =
          transformedBlueprint;
      } catch (error) {
        console.error("Error transforming blueprint:", error, blueprint);
      }
    }
  });

  return blockCategories;
};
const useGetBlueprintBlock = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["blueprint-block-editor"],
    queryFn: fetchBlueprint,
    select: useCallback(
      (data: ApiResponse<TBlueprintWithElement[]>) =>
        transformBlueprint(data.data ?? []),
      []
    ),
  });
  return { data, isError, isLoading };
};
export default useGetBlueprintBlock;
