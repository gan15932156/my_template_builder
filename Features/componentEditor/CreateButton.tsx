"use client";

import { ApiResponse } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { editorStyle } from "../blueprint/constants/editorStyle";
const apiPath = "/api/component";
export const CreateButtonStyled = styled.button`
  cursor: pointer;
  padding-inline: 1.2rem;
  padding-block: 0.4rem;
  color: ${editorStyle.background};
  text-decoration: none;
  transition: background-color 0.3s, border 0.3s;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  background-color: ${editorStyle.success};
  &:hover {
    background-color: ${editorStyle.success300};
    border: 1px solid white;
  }
`;
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
    <CreateButtonStyled
      disabled={isPending}
      onClick={handleOnClick}
      type="button"
    >
      Create component
    </CreateButtonStyled>
  );
};

export default CreateButton;
