"use client";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
const overlayHeight = 4;
const overalyPaadding = 2;
const OverlayBase = styled.div<{ $isOver: boolean }>`
  position: absolute;
  background-color: ${editorStyle.primary500};
  z-index: 999;
  padding: ${overalyPaadding};

  /* ${(props) =>
    props.$isOver &&
    css`
      background-color: ${editorStyle.primary500};
    `} */
`;

const TopOverlayStyled = styled(OverlayBase)<{
  $top: string;
  $left: string;
  $width: string;
  $height: string;
}>`
  ${(props) => css`
    top: ${props.$top};
    left: ${props.$left};
    width: ${props.$width};
    height: ${props.$height};
  `}
`;

const BottomOverlayStyled = styled(OverlayBase)<{
  $top: string;
  $left: string;
  $width: string;
  $height: string;
}>`
  ${(props) => css`
    top: ${props.$top};
    left: ${props.$left};
    width: ${props.$width};
    height: ${props.$height};
  `}
`;

function useOverlay2(
  isHorizontal: boolean,
  targetRef: React.RefObject<HTMLElement>,
  elementId: string,
  category: string
) {
  const [positionAndSize, setPositionAndSize] = useState({
    topElm: { top: "0px", left: "0px", width: "0px", height: "0px" },
    bottomElm: { top: "0px", left: "0px", width: "0px", height: "0px" },
  });

  const { isOver: isTopOver, setNodeRef: setTopNodeRef } = useDroppable({
    id: "drop-top-" + elementId,
    data: { isTopDropArea: true, id: elementId, category },
  });

  const { isOver: isBottomOver, setNodeRef: setBottomNodeRef } = useDroppable({
    id: "drop-bottom-" + elementId,
    data: { isTopDropArea: false, id: elementId, category },
  });

  const overlayHeight = 10; // Fixed: Ensure overlayHeight is defined

  useEffect(() => {
    if (!targetRef.current) {
      console.warn("targetRef.current is null");
      return;
    }

    const target = targetRef.current;
    const rect = target.getBoundingClientRect();

    const leftTopElm = `${rect.left + window.scrollX}px`;
    const topTopElm = `${rect.top + window.scrollY}px`;

    const leftBottomElm = `${rect.left + window.scrollX}px`;
    const topBottomElm = `${rect.bottom + window.scrollY}px`;

    const width = isHorizontal ? `${rect.width}px` : `${overlayHeight}px`;

    const height = isHorizontal ? `${overlayHeight}px` : `${rect.height}px`;

    setPositionAndSize({
      topElm: { top: topTopElm, left: leftTopElm, width, height },
      bottomElm: { top: topBottomElm, left: leftBottomElm, width, height },
    });
  }, [isHorizontal, targetRef, elementId, category]);

  const TopOverlay = useMemo(() => {
    return () =>
      createPortal(
        <TopOverlayStyled
          ref={setTopNodeRef}
          $isOver={isTopOver}
          $left={positionAndSize.topElm.left}
          $top={positionAndSize.topElm.top}
          $width={positionAndSize.topElm.width}
          $height={positionAndSize.topElm.height}
        />,
        document.body
      );
  }, [isTopOver, positionAndSize, setTopNodeRef]);

  const BottomOverlay = useMemo(() => {
    return () =>
      createPortal(
        <BottomOverlayStyled
          ref={setBottomNodeRef}
          $isOver={isBottomOver}
          $left={positionAndSize.bottomElm.left}
          $top={positionAndSize.bottomElm.top}
          $width={positionAndSize.bottomElm.width}
          $height={positionAndSize.bottomElm.height}
        />,
        document.body
      );
  }, [isBottomOver, positionAndSize, setBottomNodeRef]);

  return { TopOverlay, BottomOverlay };
}

export default useOverlay2;
