"use client";

import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styles from "@/Features/componentEditor/CreateButton.module.css";
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
    <button
      className={styles.button}
      disabled={isPending}
      onClick={handleOnClick}
      type="button"
    >
      Create blueprint
    </button>
  );
};

export default CreateButton;
