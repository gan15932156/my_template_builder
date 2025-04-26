"use client";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Active, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { selectBlueprint } from "../slice/elementSlice";
const overlayHeight = 4;
const overalyPaadding = 2;
const OverlayBase = styled.div<{ $isOver: boolean }>`
  position: absolute;
  background-color: transparent;
  padding: ${overalyPaadding}px;

  ${(props) =>
    props.$isOver &&
    css`
      background-color: ${editorStyle.primary500};
    `}
`;

// const TopOverlayStyled = styled(OverlayBase)<{
//   $top: string;
//   $left: string;
//   $width: string;
//   $height: string;
// }>`
//   ${(props) => css`
//     top: ${props.$top};
//     left: ${props.$left};
//     width: ${props.$width};
//     height: ${props.$height};
//   `}
// `;
// const BottomOverlayStyled = styled(OverlayBase)<{
//   $top: string;
//   $left: string;
//   $width: string;
//   $height: string;
// }>`
//   ${(props) => css`
//     top: ${props.$top};
//     left: ${props.$left};
//     width: ${props.$width};
//     height: ${props.$height};
//   `}
// `;
const TopOverlayStyled = styled(OverlayBase).attrs<{
  $top: string;
  $left: string;
  $width: string;
  $height: string;
}>((props) => ({
  style: {
    top: props.$top,
    left: props.$left,
    width: props.$width,
    height: props.$height,
  },
}))``;

const BottomOverlayStyled = styled(OverlayBase).attrs<{
  $top: string;
  $left: string;
  $width: string;
  $height: string;
}>((props) => ({
  style: {
    top: props.$top,
    left: props.$left,
    width: props.$width,
    height: props.$height,
  },
}))``;

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
  const currentBlueprint = useAppSelector(selectBlueprint);
  const [currentDragElement, setCurrentDragElement] = useState<Active>();
  const overlayHeight = 10; // Fixed: Ensure overlayHeight is defined
  const overlayGap = 4;
  useDndMonitor({
    onDragStart: (event) => {
      setCurrentDragElement(event.active);
    },
    onDragCancel: () => {
      setCurrentDragElement(undefined);
    },
    onDragEnd: () => {
      setCurrentDragElement(undefined);
    },
  });
  useEffect(() => {
    if (targetRef.current) {
      const target = targetRef.current;
      const rect = target.getBoundingClientRect();

      const left = rect.left + window.scrollX;
      const right = rect.right + window.scrollX;
      const top = rect.top + window.scrollY;
      const bottom = rect.bottom + window.scrollY;

      const width = isHorizontal ? `${rect.width}px` : `${overlayHeight}px`;
      const height = isHorizontal ? `${overlayHeight}px` : `${rect.height}px`;

      setPositionAndSize({
        topElm: {
          top: isHorizontal ? `${top - overlayGap}px` : `${top}px`,
          left: isHorizontal ? `${left}px` : `${left - overlayGap}px`,
          width,
          height,
        },
        bottomElm: {
          top: isHorizontal ? `${bottom}px` : `${top}px`,
          left: isHorizontal ? `${left}px` : `${right - overlayGap}px`,
          width,
          height,
        },
      });
    }
  }, [
    isHorizontal,
    targetRef,
    elementId,
    category,
    currentDragElement,
    currentBlueprint,
  ]);

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
  }, [
    isTopOver,
    positionAndSize,
    setTopNodeRef,
    isHorizontal,
    targetRef,
    elementId,
    category,
  ]);

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
  }, [
    isBottomOver,
    positionAndSize,
    setBottomNodeRef,
    isHorizontal,
    targetRef,
    elementId,
    category,
  ]);

  return { TopOverlay, BottomOverlay };
}

export default useOverlay2;
