"use client";

import { ApiResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";
import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import useSaveBlueprint from "@/Features/blueprint/hooks/useSaveBlueprint";
import { FormControl } from "../../../styleManager/components/PropertyField";
const SelectedCaregory = styled.div<{ $isDiabled: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-inline-start: 0.1rem;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  cursor: pointer;

  ${(props) =>
    props.$isDiabled &&
    css`
      user-select: none;
      pointer-events: none;
    `}
`;
const AddCategoryField = styled.input`
  width: 100%;
  background-color: transparent;
`;
const CurrentCategory = styled.p`
  width: 100%;
`;
const Select = styled.div`
  position: absolute;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  border: 2px solid #111111;
  z-index: 5;
  top: 100%;
  left: 0;
  width: 100%;
  border-radius: 0.2rem;
  padding-block: 0.2rem;
`;
const Item = styled.div<{ $isSelected: boolean }>`
  padding: 0.2rem 0.1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${(props) =>
    props.$isSelected &&
    css`
      background-color: #4272c0;
      color: white;
    `}
  &:hover {
    background-color: #4272c0;
    color: white;
  }
`;
const fetchBlueprintCategory = async (): Promise<ApiResponse<string[]>> => {
  const apiPath = `/api/blueprint/category`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};
const BlueprintCategorySelectbox: React.FC = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["blueprint-category"],
    queryFn: fetchBlueprintCategory,
  });
  const currentBlueprint = useAppSelector(selectBlueprint);
  const [isVisible, setIsVisible] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState("");
  const [value, setValue] = useState(
    currentBlueprint?.category && currentBlueprint.category.length > 0
      ? currentBlueprint.category
      : "other"
  );
  const {
    blueprintMutate: { mutate, isPending },
  } = useSaveBlueprint();
  const handleOnFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCategoryValue(event.target.value);
  };
  const handleUpdateCategory = (newCategory: string) => {
    if (currentBlueprint) {
      mutate({
        blueprint: { ...currentBlueprint, category: newCategory },
        newImage: null,
      });
    }
  };
  const handleOnFieldBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.target.value !== "") {
      handleToggleSelect();
      handleUpdateCategory(event.target.value);
      setNewCategoryValue("");
    }
  };
  const handleToggleSelect = () => setIsVisible((prev) => !prev);
  const handleItemClick = (
    event: MouseEvent<HTMLDivElement>,
    newCategory: string
  ) => {
    event.stopPropagation();
    handleToggleSelect();
    handleUpdateCategory(newCategory);
  };
  useEffect(() => {
    if (currentBlueprint) {
      setValue(
        currentBlueprint?.category && currentBlueprint.category.length > 0
          ? currentBlueprint.category
          : "other"
      );
    }
  }, [currentBlueprint]);
  if (isLoading) return <div>Loading...</div>;
  return (
    !isLoading &&
    !isError && (
      <FormControl>
        <label htmlFor="category">category</label>
        <SelectedCaregory $isDiabled={isPending}>
          <CurrentCategory onClick={handleToggleSelect}>
            {value}
          </CurrentCategory>
          {isVisible && data?.data && (
            <Select>
              <AddCategoryField
                type="text"
                placeholder="Add new category?"
                value={newCategoryValue}
                onChange={handleOnFieldChange}
                onBlur={handleOnFieldBlur}
              />
              {data?.data.map((category, index) => {
                return (
                  <Item
                    key={index}
                    onClick={(e) => handleItemClick(e, category)}
                    $isSelected={value == category}
                  >
                    {category}
                  </Item>
                );
              })}
            </Select>
          )}
        </SelectedCaregory>
      </FormControl>
    )
  );
};

export default BlueprintCategorySelectbox;
