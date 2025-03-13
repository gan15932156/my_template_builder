"use client";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import styled, { css } from "styled-components";
const overlayHeight = "4px";
const overalyPaadding = "4px";
const OverlayBase = styled.div<{ $isOver: boolean }>`
  position: absolute;
  background-color: transparent;
  z-index: 999;
  padding: ${overalyPaadding};
  && {
    ${(props) =>
      props.$isOver &&
      css`
        background-color: ${editorStyle.primary500};
      `}
  }
`;

const TopOverlayStyled = styled(OverlayBase)<{ $isHorizontal: boolean }>`
  ${(props) =>
    props.$isHorizontal
      ? css`
          width: 100%;
          height: ${overlayHeight};
          top: -2px;
          left: 0;
        `
      : css`
          width: ${overlayHeight};
          height: 100%;
          top: 0;
          left: -2px;
          bottom: 0;
        `}
`;

const BottomOverlayStyled = styled(OverlayBase)<{ $isHorizontal: boolean }>`
  ${(props) =>
    props.$isHorizontal
      ? css`
          width: 100%;
          height: ${overlayHeight};
          bottom: -2px;
          left: 0;
        `
      : css`
          width: ${overlayHeight};
          height: 100%;
          top: 0;
          right: -2px;
          bottom: 0;
        `}
`;

function useOverlay(
  isHorizontal: boolean,
  elementId: string,
  category: string
) {
  const { isOver: isTopOver, setNodeRef: setTopNodeRef } = useDroppable({
    id: "drop-top-" + elementId,
    data: { isTopDropArea: true, id: elementId, category },
  });
  const { isOver: isBottomOver, setNodeRef: setBottomNodeRef } = useDroppable({
    id: "drop-bottom-" + elementId,
    data: { isTopDropArea: false, id: elementId, category },
  });
  const TopOverlay = useMemo(() => {
    return () => (
      <TopOverlayStyled
        ref={setTopNodeRef}
        $isOver={isTopOver}
        $isHorizontal={isHorizontal}
      />
    );
  }, [elementId, isHorizontal, isTopOver]);

  const BottomOverlay = useMemo(() => {
    return () => (
      <BottomOverlayStyled
        ref={setBottomNodeRef}
        $isOver={isBottomOver}
        $isHorizontal={isHorizontal}
      />
    );
  }, [elementId, isHorizontal, isBottomOver]);

  return { TopOverlay, BottomOverlay };
}

export default useOverlay;
