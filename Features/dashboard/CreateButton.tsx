"use client";

import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const createProjectApiPath = "/api/project";
const createProjects = (): Promise<ApiResponse<string>> =>
  fetch(createProjectApiPath, { method: "POST" }).then((response) =>
    response.json()
  );
const CreateButton: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createProjects,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push(`/editor/${data.data}`);
    },
  });
  const handleOnClick = () => {
    mutate();
  };
  return (
    <button disabled={isPending} onClick={handleOnClick} type="button">
      Create project
    </button>
  );
};

export default CreateButton;
