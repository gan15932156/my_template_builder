"use client";

import { ApiResponse, TBlueprintWithElement } from "@/types/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
const fetchBlueprint = async (
  id: string
): Promise<ApiResponse<TBlueprintWithElement>> => {
  const apiPath = `/api/blueprint/${id}`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};
const useBlueprintData = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["blueprint-editor", id],
    queryFn: () => fetchBlueprint(id),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
  return { data, isError, isLoading };
};
export default useBlueprintData;
