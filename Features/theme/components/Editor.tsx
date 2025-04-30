"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled, { css } from "styled-components";
import ThemeForm from "./ThemeForm";
import { useAppDispatch } from "@/hooks/reduxHooks";
import {
  resetThemeData,
  updateTheme,
} from "@/Features/blueprint/slice/themeSlice";
import useThemeData from "../hooks/useThemeData";
import { useEffect, useState } from "react";
import { TTheme } from "../types";
import ShowcasePage from "./showcase/ShowcasePage";
import ExampleLandingPage from "./showcase/ExampleLandingPage";

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
const CaseButton = styled.button<{ $isActive: boolean }>`
  width: 100%;

  padding-block: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${editorStyle.primary500};
    color: ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
  }

  ${(props) =>
    props.$isActive
      ? css`
          border: 1px solid ${editorStyle.primary500};
          color: ${editorStyle.primary500};
          background-color: ${editorStyle.secondary500};
        `
      : css`
          border: 1px solid ${editorStyle.secondary500};
          color: ${editorStyle.primary500};
          background-color: transparent;
        `}
`;
const CaseWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Editor: React.FC<Props> = ({ themeId }) => {
  const dispatch = useAppDispatch();
  const [exampleStatus, setExampleStatus] = useState<"element" | "page">(
    "page"
  );
  const { data, isError, isLoading } = useThemeData(themeId);
  const handleChangeExample = (newExample: "element" | "page") =>
    setExampleStatus(newExample);
  useEffect(() => {
    dispatch(resetThemeData());
  }, []);
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
        <div>
          <CaseWrapper>
            <CaseButton
              $isActive={exampleStatus === "page"}
              onClick={() => handleChangeExample("page")}
            >
              {exampleStatus === "page" ? "Page" : "Show page example"}
            </CaseButton>
            <CaseButton
              $isActive={exampleStatus === "element"}
              onClick={() => handleChangeExample("element")}
            >
              {exampleStatus === "element" ? "Element" : "Show element example"}
            </CaseButton>
          </CaseWrapper>
          {exampleStatus === "element" ? (
            <ShowcasePage />
          ) : (
            <ExampleLandingPage />
          )}
        </div>
      </GridItemWrapper>
    </GridWrapper>
  );
};

export default Editor;
