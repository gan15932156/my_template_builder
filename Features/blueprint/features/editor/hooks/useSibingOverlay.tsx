"use client";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useMemo } from "react";
import styled, { css } from "styled-components";

const OverlayBase = styled.div<{ $isOver: boolean }>`
  position: absolute;
  background-color: transparent;
  z-index: 999;

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
          height: 10px;
          top: -5px;
          left: 0;
        `
      : css`
          width: 10px;
          height: 100%;
          top: 0;
          left: -5px;
          bottom: 0;
        `}
`;

const BottomOverlayStyled = styled(OverlayBase)<{ $isHorizontal: boolean }>`
  ${(props) =>
    props.$isHorizontal
      ? css`
          width: 100%;
          height: 10px;
          bottom: -5px;
          left: 0;
        `
      : css`
          width: 10px;
          height: 100%;
          top: 0;
          right: -5px;
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
  //   useEffect(() => {
  //     console.log(isBottomOver, isTopOver);
  //   }, [isBottomOver, isTopOver]);
  return { TopOverlay, BottomOverlay };
}

export default useOverlay;
