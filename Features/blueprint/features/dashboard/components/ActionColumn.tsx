"use client";

import { ApiResponse, TBlueprint } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FiEdit, FiSlash } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ActionColButton,
  ActionColWrapper,
} from "@/Features/projectEditor/ActionColumn";
interface Props {
  row: Row<TBlueprint>;
}
const deleteBlueprint = (id: string): Promise<ApiResponse<TBlueprint>> =>
  fetch(`/api/blueprint/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
const ActionColumn: React.FC<Props> = ({ row }) => {
  const { id, status } = row.original;
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: deleteBlueprint,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["blueprint-editor", data.data?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["blueprint-block-editor"],
      });
      queryClient.invalidateQueries({
        queryKey: ["blueprint-category"],
      });
      queryClient.invalidateQueries({
        queryKey: ["blueprints"],
      });
    },
  });
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/blueprint/editor/${id}`);
    // console.log("edit");
  };
  const handleCahngeStatus = () => {
    if (confirm("Are you sure?")) mutate(id);
  };
  return (
    status == "ACTIVE" && (
      <ActionColWrapper>
        <ActionColButton
          title="Edit"
          disabled={isPending}
          onClick={handleEdit}
          $variant="warning"
        >
          <FiEdit />
        </ActionColButton>
        <ActionColButton
          title="Change status"
          disabled={isPending}
          onClick={handleCahngeStatus}
          $variant="danger"
        >
          <FiSlash />
        </ActionColButton>
      </ActionColWrapper>
    )
  );
};

export default ActionColumn;
