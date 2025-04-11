"use client";

import { ApiResponse, TThemeWithElement } from "@/types/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { TTheme } from "../types";

const fetchTheme = async (
  id: string
): Promise<ApiResponse<TThemeWithElement>> => {
  const apiPath = `/api/theme/${id}`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};

const saveTheme = (theme: TTheme): Promise<ApiResponse<TTheme>> =>
  fetch(`/api/theme/${theme.id}`, {
    method: "PATCH",
    body: JSON.stringify(theme),
  }).then((response) => response.json());
const useThemeData = (id: string) => {
  const queryClient = useQueryClient();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["theme-editor", id],
    queryFn: () => fetchTheme(id),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
  const themeMutate = useMutation({
    mutationFn: saveTheme,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["theme-editor", data.data?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["themes"],
      });
    },
  });
  return { data, isError, isLoading, themeMutate };
};
export default useThemeData;
