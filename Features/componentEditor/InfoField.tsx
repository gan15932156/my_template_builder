"use client";
import DataInfoInput from "@/app/components/DataInfoInput";
import { ApiResponse } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
  id: string;
}
interface Option {
  value: string;
  label: string;
}
const options: Option[] = [
  { value: "COMPONENT", label: "Component" },
  { value: "SECTION", label: "Section" },
  { value: "PAGE", label: "Page" },
];
const fetchComponent = async (
  id: string
): Promise<ApiResponse<{ id: string; name: string; category: string }>> => {
  const apiPath = `/api/component/${id}/info`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};
const InfoField: React.FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const {
    data,
    isError,
    isLoading: isFetchLoading,
  } = useQuery({
    queryFn: () => fetchComponent(id),
    queryKey: ["component", id],
  });
  const mutation = useMutation({
    mutationFn: async (newInfo: { name: string; category: string }) => {
      const response = await fetch(`/api/component/${id}/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      });
      if (!response.ok) {
        const text = await response.text();
        try {
          const error = JSON.parse(text);
          throw new Error(error.message || "Failed to update component");
        } catch {
          throw new Error(text || "Failed to update component");
        }
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["component", id] });
    },
    onError: (error: unknown) => {
      console.error("Error updating component", error);
    },
  });
  const handleNameFieldOnBlue = (e: React.FocusEvent<HTMLInputElement>) => {
    mutation.mutate({ name, category });
  };
  const handleNameFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setCategory(newCategory);
    mutation.mutate({ name, category: newCategory });
  };
  useEffect(() => {
    if (data && data.data) {
      setName(data.data?.name);
      setCategory(data.data.category);
    }
  }, [data]);
  return (
    !isFetchLoading &&
    !isError && (
      <div
        style={{
          paddingTop: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <DataInfoInput
          label="Name"
          placeholder="name..."
          value={name || ""}
          onBlur={handleNameFieldOnBlue}
          onChange={handleNameFieldChange}
          disabled={isFetchLoading || mutation.isPending}
          id={"name"}
        />
        <div>
          <label htmlFor={"dropdown"}>Category</label>
          <select
            id="dropdown"
            disabled={isFetchLoading || mutation.isPending}
            value={category}
            onChange={handleSelectChange}
            //   style={{
            //     padding: "4px",
            //     borderRadius: "4px",
            //     border: "1px solid #ccc",
            //     minWidth: "80px",
            //   }}
          >
            <option value="" disabled>
              -- Choose an category --
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  );
};

export default InfoField;
