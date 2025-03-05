"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import TooltipPanel from "./TooltipPanel";
interface TooltipProps {
  targetRef: React.RefObject<HTMLElement>;
  isActive: boolean;
}
const TooltipContainer = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1000;
  transform: translate(-50%, -100%); /* Center horizontally */
`;
const Tooltip: React.FC<TooltipProps> = ({ targetRef, isActive }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!targetRef.current || !isActive) return;

    const target = targetRef.current;
    const rect = target.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY - rect.height,
      left: rect.left + window.scrollX + rect.width / 2,
    });
  }, [targetRef, isActive]);
  return isActive
    ? createPortal(
        <TooltipContainer $top={position.top} $left={position.left}>
          <TooltipPanel />
        </TooltipContainer>,
        document.body
      )
    : null;
};

export default Tooltip;
