"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled from "styled-components";
import ColorVarForm from "./ColorVarForm";
import { IoSaveOutline } from "react-icons/io5";
import StyleForm from "./StyleForm";
import { Input } from "./AddColorVarForm";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import useManageTheme from "../hooks/useManageTheme";
import useThemeData from "../hooks/useThemeData";
import { Props } from "./Editor";
const GridWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(3, max-content);
  gap: 0.2rem;
  font-size: 0.8rem;
`;
const GridItemWrapper = styled.div`
  padding: 0.1rem;
  border: 1px solid ${editorStyle.primary300};
`;
const ActionWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NameFormWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2rem;
`;
const SaveButton = styled.button`
  cursor: pointer;
  border-radius: 0.2rem;
  border: 1px solid transparent;
  color: ${editorStyle.secondary500};
  background-color: ${editorStyle.primary500};
  display: flex;
  align-items: center;
  padding: 0.2rem 0.8rem;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
    color: ${editorStyle.primary500};
  }
  &:disabled {
    filter: brightness(0.4);
    cursor: not-allowed;
  }
`;
const ThemeForm: React.FC<Props> = ({ themeId }) => {
  const { currentTheme } = useManageTheme();
  const { themeMutate } = useThemeData(themeId);
  const getName = useMemo(() => currentTheme?.name || "", [currentTheme?.name]);
  const [name, setName] = useState(getName);
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleSaveTheme = () => {
    if (currentTheme) {
      themeMutate.mutate({ ...currentTheme, name });
    }
  };
  useEffect(() => {
    if (currentTheme) {
      setName(getName);
    }
  }, [currentTheme]);
  return (
    <GridWrapper>
      <GridItemWrapper>
        <ActionWrapper>
          <SaveButton
            onClick={handleSaveTheme}
            disabled={themeMutate.isPending}
          >
            <IoSaveOutline size={24} />
          </SaveButton>
          {!themeMutate.isError ? (
            <NameFormWrapper>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter theme name"
                value={name}
                onChange={handleOnChange}
                disabled={themeMutate.isPending}
              />
            </NameFormWrapper>
          ) : (
            <div>
              <p>{themeMutate.error.message}</p>
            </div>
          )}
        </ActionWrapper>
      </GridItemWrapper>
      <GridItemWrapper>
        <ColorVarForm />
      </GridItemWrapper>
      <GridItemWrapper>
        <StyleForm />
      </GridItemWrapper>
    </GridWrapper>
  );
};

export default ThemeForm;
