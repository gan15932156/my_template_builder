"use client";

import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateButtonStyled } from "@/Features/componentEditor/CreateButton";
const apiPath = "/api/blueprint";
const createProject = (): Promise<ApiResponse<string>> =>
  fetch(apiPath, { method: "POST" }).then((response) => response.json());
const CreateButton: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["blueprints"] });
      router.push(`/blueprint/editor/${data.data}`);
    },
  });
  const handleOnClick = () => {
    mutate();
  };
  return (
    <CreateButtonStyled
      disabled={isPending}
      onClick={handleOnClick}
      type="button"
    >
      Create blueprint
    </CreateButtonStyled>
  );
};

export default CreateButton;
