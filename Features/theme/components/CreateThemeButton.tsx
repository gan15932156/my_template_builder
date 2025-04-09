"use client";

import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import StyledCreateButton from "./StyledCreateButton";

const apiPath = "/api/theme";
const createTheme = (): Promise<ApiResponse<string>> =>
  fetch(apiPath, { method: "POST" }).then((response) => response.json());
const CreateThemeButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createTheme,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["themes"] });
      //   router.push(`/editor/${data.data}`);
    },
  });
  const handleOnClick = () => {
    mutate();
  };
  return (
    <StyledCreateButton
      disabled={isPending}
      onClick={handleOnClick}
      type="button"
    >
      Create theme
    </StyledCreateButton>
  );
};

export default CreateThemeButton;
