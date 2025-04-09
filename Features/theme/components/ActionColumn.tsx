"use client";

import { TTheme } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import styles from "@/Features/componentEditor/ActionColumn.module.css";
import { FiEdit, FiSlash } from "react-icons/fi";
interface Props {
  row: Row<TTheme>;
}
const ActionColumn: React.FC<Props> = ({ row }) => {
  const { id } = row.original;
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/theme/editor/${id}`);
  };
  const handleCahngeStatus = () => {
    console.log("handleCahngeStatus", id);
  };
  return (
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
  );
};

export default ActionColumn;
