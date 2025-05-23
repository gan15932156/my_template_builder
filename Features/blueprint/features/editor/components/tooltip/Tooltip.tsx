"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import TooltipPanel from "./TooltipPanel";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";
import { Active, useDndMonitor } from "@dnd-kit/core";
interface TooltipProps {
  targetRef: React.RefObject<HTMLElement>;
  isActive: boolean;
  isCanPasteElement: boolean;
}
const TooltipContainer = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  background: ${editorStyle.primary300};
  color: ${editorStyle.secondary500};
  padding: 0.1rem;
  border-radius: 0.2rem;
  white-space: nowrap;
  z-index: 1000;
  transform: translate(-50%, -100%); /* Center horizontally */
`;
const Tooltip: React.FC<TooltipProps> = ({
  targetRef,
  isActive,
  isCanPasteElement,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const currentBlueprint = useAppSelector(selectBlueprint);
  const [currentDragElement, setCurrentDragElement] = useState<Active>();

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
    if (!targetRef.current || !isActive) return;

    const target = targetRef.current;
    const rect = target.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY - rect.height,
      left: rect.left + window.scrollX + rect.width / 2,
    });
  }, [targetRef, isActive, currentBlueprint, currentDragElement]);
  return isActive
    ? createPortal(
        <TooltipContainer $top={position.top} $left={position.left}>
          <TooltipPanel isCanPasteElement={isCanPasteElement} />
        </TooltipContainer>,
        document.body
      )
    : null;
};

export default Tooltip;
