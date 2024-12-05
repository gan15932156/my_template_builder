"use client";

import { IComponent } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { useState } from "react";

interface Props {
  row: Row<IComponent>;
}
interface Option {
  value: string;
  label: string;
}

const CategoryColumn: React.FC<Props> = ({ row }) => {
  const { id, category } = row.original;
  const [selectedOption, setSelectedOption] = useState<string>(category);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (newCategory: string) => {
      const response = await fetch(`/api/component/${id}/updateCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) {
        const text = await response.text();
        try {
          const error = JSON.parse(text);
          throw new Error(error.message || "Failed to update category");
        } catch {
          throw new Error(text || "Failed to update category");
        }
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["components"] });
    },
    onError: (error: unknown) => {
      console.error("Error updating category:", error);
    },
  });
  const options: Option[] = [
    { value: "COMPONENT", label: "Component" },
    { value: "SECTION", label: "Section" },
    { value: "PAGE", label: "Page" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = event.target.value;
    setSelectedOption(newCategory);
    mutation.mutate(newCategory);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <select
        id="dropdown"
        disabled={mutation.isPending}
        value={selectedOption}
        onChange={handleChange}
        style={{
          padding: "4px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          minWidth: "80px",
        }}
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
  );
};

export default CategoryColumn;
