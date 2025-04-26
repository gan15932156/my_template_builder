"use client";
import { createPortal } from "react-dom";
import styled from "styled-components";
import TooltipPanel from "./TooltipPanel";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectElementTooltipState } from "@/Features/blueprint/slice/elementToolStateSlice";

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
const Tooltip2 = () => {
  const tooltipState = useAppSelector(selectElementTooltipState);
  return tooltipState.isActive
    ? createPortal(
        <TooltipContainer
          $top={tooltipState.position.y}
          $left={tooltipState.position.x}
        >
          <TooltipPanel isCanPasteElement={tooltipState.canInsertElement} />
        </TooltipContainer>,
        document.body
      )
    : null;
};

export default Tooltip2;
