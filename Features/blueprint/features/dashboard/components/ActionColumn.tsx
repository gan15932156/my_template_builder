"use client";

import { TBlueprint } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import styles from "@/Features/componentEditor/ActionColumn.module.css";
import { FiEdit, FiSlash } from "react-icons/fi";
interface Props {
  row: Row<TBlueprint>;
}
const ActionColumn: React.FC<Props> = ({ row }) => {
  const { id, status } = row.original;
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/blueprint/editor/${id}`);
    // console.log("edit");
  };
  const handleCahngeStatus = () => {
    console.log("handleCahngeStatus", id);
  };
  return (
    status == "ACTIVE" && (
      <div className={styles.actionContainer}>
        <button
          title="Edit"
          onClick={handleEdit}
          className={`${styles.actionButton} ${styles["warning"]}`}
        >
          <FiEdit />
        </button>
        <button
          title="Change status"
          onClick={handleCahngeStatus}
          className={`${styles.actionButton} ${styles["danger"]}`}
        >
          <FiSlash />
        </button>
      </div>
    )
  );
};

export default ActionColumn;
