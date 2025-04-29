"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useDroppable } from "@dnd-kit/core";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectBlueprint,
  updateElement,
} from "@/Features/blueprint/slice/elementSlice";
import { transformToTBlueprint } from "../utils/transformData";
import RenderElement from "./renderElement/RenderElement";
import useDragDropEvent, {
  DropPosition,
} from "../../../hooks/useDragDropEvent";
import useBlueprintData from "../../../hooks/useGetBlueprint";
import { ColorVar } from "../../blockManager/type";
import Tooltip2 from "./tooltip/Tooltip2";
import { clearTooltip } from "@/Features/blueprint/slice/elementToolStateSlice";

const Wrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 3;
  padding: 0.4rem;
  overflow: scroll;
`;
const EditorArea = styled.div<{ $isOver: boolean }>`
  width: 100%;
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
  const {
    isError: blueprintBlockIsError,
    isLoading: blueprintBlockIsLoading,
    dropPosition,
    position,
  } = useDragDropEvent();
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
  const handleClearTooltip = () => {
    dispatch(clearTooltip());
  };
  useEffect(() => {
    if (blueprintData) {
      const { createdAt, status, updatedAt, ...rest } = blueprintData;
      const isBlueprint = true;
      if (rest.element && Object.keys(rest.element).length > 0) {
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
            colorVars: rest.colorVars as ColorVar,
          })
        );
      }
    }
  }, [blueprintData]);

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
    <Wrapper onScroll={handleClearTooltip}>
      <EditorArea ref={setNodeRef} $isOver={isOver} id="editor-area">
        <RenderElement />
        <Tooltip2 />
        <DropIndicator dropPosition={dropPosition} />
        {/* <Delta position={position} /> */}
      </EditorArea>
    </Wrapper>
  );
};

export default Editor;

function Delta({ position }: { position: { x: number; y: number } | null }) {
  if (!position) return;
  const style: React.CSSProperties = {
    position: "fixed",
    backgroundColor: "red",
    borderRadius: "2rem",
    left: position.x,
    top: position.y,
    width: "1rem",
    height: "1rem",
    pointerEvents: "none",
    zIndex: 9999,
  };
  return <div style={style}></div>;
}
type DropIndicatorProps = {
  dropPosition: DropPosition | null;
};
function DropIndicator({ dropPosition }: DropIndicatorProps) {
  const [style, setStyle] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    if (!dropPosition) {
      setStyle(null);
      return;
    }

    const { targetId, position, axis } = dropPosition;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) {
      setStyle(null);
      return;
    }

    const rect = targetEl.getBoundingClientRect();
    const commonStyle: React.CSSProperties = {
      position: "fixed",
      pointerEvents: "none",
      zIndex: 9999,
      background: "blue",
      left: rect.left,
    };

    if (position === "top") {
      setStyle({
        ...commonStyle,
        top: axis === "row" ? rect.top - 2 : rect.top,
        width: axis === "row" ? rect.width : "4px",
        height: axis === "row" ? "4px" : rect.height,
      });
    } else if (position === "bottom") {
      setStyle({
        ...commonStyle,
        top: axis === "row" ? rect.bottom - 2 : rect.top,
        left: axis === "row" ? rect.left : rect.left + rect.width,
        width: axis === "row" ? rect.width : "4px",
        height: axis === "row" ? "4px" : rect.height,
      });
    } else if (position === "inner") {
      setStyle({
        ...commonStyle,
        background: "rgba(0, 0, 255, 0.15)",
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [dropPosition]);

  if (!style) return null;

  return <div style={style} />;
}
