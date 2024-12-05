"use client";
import { IProject } from "@/types/types";
import styles from "./ActionColumn.module.css";
import { Row } from "@tanstack/react-table";
import { FiEdit, FiSlash } from "react-icons/fi";
import { useRouter } from "next/navigation";
interface Props {
  row: Row<IProject>;
}
const ActionColumn: React.FC<Props> = ({ row }) => {
  const { id, status } = row.original;
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/editor/${id}`);
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
