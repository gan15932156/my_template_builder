"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled from "styled-components";
import ThemeForm from "./ThemeForm";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateTheme } from "@/Features/blueprint/slice/themeSlice";
import useThemeData from "../hooks/useThemeData";
import { useEffect } from "react";
import { TTheme } from "../types";

interface Props {
  themeId: string;
}
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.4fr;
  gap: 0.2rem;
  min-height: 90vh;
`;
const GridItemWrapper = styled.div`
  padding: 0.1rem;
  border: 1px solid ${editorStyle.primary300};
`;
const Editor: React.FC<Props> = ({ themeId }) => {
  const dispatch = useAppDispatch();
  const { data, isError, isLoading } = useThemeData(themeId);
  useEffect(() => {
    if (data) {
      const { createdAt, updatedAt, ...rest } = data;
      dispatch(updateTheme(rest as TTheme));
    }
  }, [data]);
  if (isLoading)
    return (
      <GridWrapper>
        <p>Loading...</p>
      </GridWrapper>
    );
  if (isError)
    return (
      <GridWrapper>
        <p>Error loading theme. Please try again.</p>
      </GridWrapper>
    );
  return (
    <GridWrapper>
      <GridItemWrapper>
        <ThemeForm />
      </GridItemWrapper>
      <GridItemWrapper>
        Possimus molestiae ipsum, et libero nesciunt repellendus consequuntur
        incidunt in voluptate reprehenderit doloribus architecto, fuga minima
        recusandae, assumenda inventore facilis pariatur! Quasi inventore dolore
        minima magni ducimus quia impedit natus?
      </GridItemWrapper>
    </GridWrapper>
  );
};

export default Editor;
