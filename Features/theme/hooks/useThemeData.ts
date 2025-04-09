"use client";

import { ApiResponse, TThemeWithElement } from "@/types/types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchTheme = async (
  id: string
): Promise<ApiResponse<TThemeWithElement>> => {
  const apiPath = `/api/theme/${id}`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};
const useThemeData = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["theme-editor", id],
    queryFn: () => fetchTheme(id),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
  return { data, isError, isLoading };
};
export default useThemeData;
