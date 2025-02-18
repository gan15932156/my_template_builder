"use client";

import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styles from "./CreateButton.module.css";
const apiPath = "/api/component";
const createComponent = (): Promise<ApiResponse<string>> =>
  fetch(apiPath, { method: "POST" }).then((response) => response.json());
const CreateButton: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createComponent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["components"] });
      router.push(`/component/editor/${data.data}`);
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
      Create component
    </button>
  );
};

export default CreateButton;
