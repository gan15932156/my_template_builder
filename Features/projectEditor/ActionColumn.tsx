"use client";
import styled, { css } from "styled-components";
import { IProject } from "@/types/types";
import { Row } from "@tanstack/react-table";
import { FiEdit, FiSlash } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { editorStyle } from "../blueprint/constants/editorStyle";
interface Props {
  row: Row<IProject>;
}
type ButtonVariant = "primary" | "success" | "danger" | "warning";
export const ActionColWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
export const ActionColButton = styled.button<{ $variant: ButtonVariant }>`
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.64rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: ${editorStyle.primary500};
      color: ${editorStyle.primary800};
      &:hover {
        background-color: transparent;
      }
    `}
  ${(props) =>
    props.$variant === "success" &&
    css`
      background-color: ${editorStyle.success};
      color: ${editorStyle.primary800};
      &:hover {
        background-color: transparent;
      }
    `}
  ${(props) =>
    props.$variant === "danger" &&
    css`
      background-color: ${editorStyle.danger};
      color: ${editorStyle.primary800};
      &:hover {
        background-color: transparent;
      }
    `}
  ${(props) =>
    props.$variant === "warning" &&
    css`
      background-color: ${editorStyle.warning};
      color: ${editorStyle.primary800};
      &:hover {
        background-color: transparent;
      }
    `}
`;
const ActionColumn: React.FC<Props> = ({ row }) => {
  const { id, status } = row.original;
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/project/editor/${id}`);
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
