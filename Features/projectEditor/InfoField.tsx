"use client";
import DataInfoInput from "@/app/components/DataInfoInput";
import { ApiResponse } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}
const fetchProject = async (
  id: string
): Promise<ApiResponse<{ id: string; name: string }>> => {
  const apiPath = `/api/project/${id}/info`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};
const InfoField: React.FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const {
    data,
    isError,
    isLoading: isFetchLoading,
  } = useQuery({
    queryFn: () => fetchProject(id),
    queryKey: ["project", id],
  });
  const mutation = useMutation({
    mutationFn: async (newName: string) => {
      const response = await fetch(`/api/project/${id}/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newName),
      });
      if (!response.ok) {
        const text = await response.text();
        try {
          const error = JSON.parse(text);
          throw new Error(error.message || "Failed to update project name");
        } catch {
          throw new Error(text || "Failed to update project name");
        }
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
    onError: (error: unknown) => {
      console.error("Error updating project name:", error);
    },
  });
  const handleNameFieldOnBlue = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    mutation.mutate(value);
  };
  const handleNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  useEffect(() => {
    if (data && data.data) {
      setName(data.data?.name);
    }
  }, [data]);
  return (
    !isFetchLoading &&
    !isError && (
      <div>
        <DataInfoInput
          label="Name"
          placeholder="name..."
          value={name || ""}
          onBlur={handleNameFieldOnBlue}
          onChange={handleNameFieldChange}
          disabled={isFetchLoading || mutation.isPending}
          id={"name"}
        />
      </div>
    )
  );
};

export default InfoField;
