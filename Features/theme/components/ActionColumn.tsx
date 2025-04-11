"use client";

import { ApiResponse, TTheme } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import styles from "@/Features/componentEditor/ActionColumn.module.css";
import { FiEdit, FiSlash } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface Props {
  row: Row<TTheme>;
}
const deleteTheme = (id: string): Promise<ApiResponse<TTheme>> =>
  fetch(`/api/theme/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
const ActionColumn: React.FC<Props> = ({ row }) => {
  const { id } = row.original;
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteTheme,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["theme-editor", data.data?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["themes"],
      });
    },
  });
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/theme/editor/${id}`);
  };
  const handleCahngeStatus = () => {
    if (confirm("Are you sure?")) mutate(id);
  };
  return (
    <div className={styles.actionContainer}>
      <button
        title="Edit"
        disabled={isPending}
        onClick={handleEdit}
        className={`${styles.actionButton} ${styles["warning"]}`}
      >
        <FiEdit />
      </button>
      <button
        title="Change status"
        disabled={isPending}
        onClick={handleCahngeStatus}
        className={`${styles.actionButton} ${styles["danger"]}`}
      >
        <FiSlash />
      </button>
    </div>
  );
};

export default ActionColumn;
