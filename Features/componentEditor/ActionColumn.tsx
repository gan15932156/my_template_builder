"use client";

import { IComponent } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FiEdit, FiSlash } from "react-icons/fi";
import {
  ActionColButton,
  ActionColWrapper,
} from "../projectEditor/ActionColumn";
interface Props {
  row: Row<IComponent>;
}
const ActionColumn: React.FC<Props> = ({ row }) => {
  const { id, status } = row.original;
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/component/editor/${id}`);
  };
  const handleCahngeStatus = () => {
    console.log("handleCahngeStatus", id);
  };
  return (
    status == "ACTIVE" && (
      <ActionColWrapper>
        <ActionColButton title="Edit" onClick={handleEdit} $variant="warning">
          <FiEdit />
        </ActionColButton>
        <ActionColButton
          title="Change status"
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
