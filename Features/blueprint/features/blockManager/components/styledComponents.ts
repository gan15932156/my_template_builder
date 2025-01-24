"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled, { css } from "styled-components";

const Block = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  font-size: 1rem;
  border-radius: 0.4rem;
  font-weight: bold;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  height: 100%;
  cursor: grab;
  user-select: none;
  ${(props) =>
    props.$isDragging &&
    css`
      filter: brightness(0.7);
    `}
  &:hover {
    filter: brightness(0.7);
  }
`;
const BlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${editorStyle.primary500};
  }
`;
const BlockGrid = styled.div<{ $isActive: boolean }>`
  display: none;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(4.8rem, 1fr));
  grid-template-rows: 4.8rem;
  grid-auto-rows: 4.8rem;
  gap: 1rem;
  padding-bottom: 0.4rem;

  ${(props) =>
    props.$isActive
      ? css`
          display: grid;
        `
      : css`
          display: none;
        `};
`;
const BlockHeading = styled.div`
  cursor: pointer;
  padding-inline: 0.4rem;
  text-transform: capitalize;
  font-weight: bold;
  color: ${editorStyle.primary500};
  background-color: ${editorStyle.secondary500};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BlockIcon = styled.div<{ $isActive: boolean }>`
  transition: all 0.2s ease;
  transform: rotate(180deg);
  ${(props) =>
    props.$isActive &&
    css`
      transform: rotate(0deg);
    `};
`;
export { Block, BlockWrapper, BlockHeading, BlockGrid, BlockIcon };
