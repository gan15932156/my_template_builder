"use client";

import { ApiResponse } from "@/types/types";
import { TBlueprint } from "../features/blockManager/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const saveBlueprint = (
  blueprint: TBlueprint
): Promise<ApiResponse<TBlueprint>> =>
  fetch(`/api/blueprint/${blueprint.id}`, {
    method: "PATCH",
    body: JSON.stringify(blueprint),
  }).then((response) => response.json());

const useSaveBlueprint = () => {
  const queryClient = useQueryClient();
  const blueprintMutate = useMutation({
    mutationFn: saveBlueprint,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["blueprint-editor", data.data?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["blueprint-block-editor"],
      });
      queryClient.invalidateQueries({
        queryKey: ["blueprint-category"],
      });
    },
  });
  return { blueprintMutate };
};
export default useSaveBlueprint;
