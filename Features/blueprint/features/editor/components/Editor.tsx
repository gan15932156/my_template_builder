"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useDroppable } from "@dnd-kit/core";
import styled, { css } from "styled-components";
import useBlueprintData from "../hooks/useGetBlueprint";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectBlueprint,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import { transformToTBlueprint } from "../utils/transformData";
import useDragDropEvent from "../hooks/useDragDropEvent";
import RenderElement from "./renderElement/RenderElement";

const Wrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  padding: 0.4rem;
  overflow: scroll;
`;
const EditorArea = styled.div<{ $isOver: boolean }>`
  width: 100%;
  height: 100%;
  background-color: #fff;

  ${(props) =>
    props.$isOver
      ? css`
          border: 1px dashed ${editorStyle.primary500};
        `
      : css`
          border: 1px solid transparent;
        `};
`;
interface Props {
  blueprintId: string;
}

const Editor: React.FC<Props> = ({ blueprintId }) => {
  const currentElement = useAppSelector(selectBlueprint);
  const { isError: blueprintBlockIsError, isLoading: blueprintBlockIsLoading } =
    useDragDropEvent();
  const {
    data: blueprintData,
    isError: blueprintIsError,
    isLoading: blueprintIsLoading,
  } = useBlueprintData(blueprintId);
  const { isOver, setNodeRef } = useDroppable({
    id: "editor-droppable",
    data: { isEditorDropArea: true, id: "editor-droppable-id" },
    disabled:
      currentElement?.element != null || currentElement?.element != undefined,
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (blueprintData) {
      const { createdAt, status, updatedAt, ...rest } = blueprintData;
      const isBlueprint = true;
      if (rest.element && rest.styles) {
        try {
          const blueprint = transformToTBlueprint({ ...rest, isBlueprint });
          dispatch(updateElement(blueprint));
        } catch (error) {
          console.error(error);
        }
      } else {
        dispatch(
          updateElement({
            ...blueprintData,
            isBlueprint: true,
            element: undefined,
            styles: undefined,
          })
        );
      }
    }
    // console.log(blueprintData);
  }, [blueprintData]);
  // useEffect(() => {
  //   try {
  //     const blueprint = transformToTBlueprint(mockData);
  //     dispatch(updateElement(blueprint));
  //     console.log("Transformed Blueprint:", blueprint);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);
  if (blueprintIsLoading && blueprintBlockIsLoading)
    return (
      <Wrapper>
        <p>Loading...</p>
      </Wrapper>
    );
  if (blueprintIsError && blueprintBlockIsError)
    return (
      <Wrapper>
        <p>Error loading blueprint. Please try again.</p>
      </Wrapper>
    );
  return (
    <Wrapper>
      <EditorArea ref={setNodeRef} $isOver={isOver}>
        <RenderElement />
      </EditorArea>
    </Wrapper>
  );
};

export default Editor;
