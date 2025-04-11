"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled from "styled-components";
import ThemeForm from "./ThemeForm";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateTheme } from "@/Features/blueprint/slice/themeSlice";
import useThemeData from "../hooks/useThemeData";
import { useEffect } from "react";
import { TTheme } from "../types";
import ShowcasePage from "./showcase/ShowcasePage";

export interface Props {
  themeId: string;
}
const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.2rem;
  min-height: 90vh;
  width: 100%;
`;
const GridItemWrapper = styled.div`
  padding: 0.1rem;
  border: 1px solid ${editorStyle.primary300};
  width: 100%;
  flex-grow: 1;
`;
const LeftItemWrapper = styled.div`
  padding: 0.1rem;
  border: 1px solid ${editorStyle.primary300};
  width: 100%;
  flex-basis: 28rem;
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
      <LeftItemWrapper>
        <ThemeForm themeId={themeId} />
      </LeftItemWrapper>
      <GridItemWrapper>
        <ShowcasePage />
      </GridItemWrapper>
    </GridWrapper>
  );
};

export default Editor;
