"use client";
import { TTheme } from "./../types";
import { ApiResponse, TThemeWithElement } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
const transformTodoNames = (data: ApiResponse<TThemeWithElement[]>) => {
  return data.data?.map((item) => {
    const { createdAt, updatedAt, ...rest } = item;
    return rest as TTheme;
  });
};

const fetchThemes = async (): Promise<ApiResponse<TThemeWithElement[]>> => {
  const apiPath = `/api/theme/all`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};
const useThemes = () => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["themes"],
    queryFn: fetchThemes,
    select: transformTodoNames,
  });
  return { data, isError, isLoading, error };
};
export default useThemes;
