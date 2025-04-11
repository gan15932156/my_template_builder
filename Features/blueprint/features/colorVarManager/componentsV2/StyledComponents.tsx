"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  grid-template-rows: auto 1fr;
  gap: 0.4rem;
  font-size: 0.8rem;
  padding: 1rem 0.2rem;
`;
export const ControlWrapper = styled.div`
  grid-column: 1/-1;
  grid-row: 1/2;
  width: 100%;
  border-radius: 0.2rem;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  padding-block: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ControlButton = styled.button`
  cursor: pointer;
  border: 2px solid transparent;
  background-color: transparent;
  display: flex;
  color: inherit;
  align-items: center;
  padding: 0.2rem;
  justify-content: center;
  border-radius: 2rem;
  transition: all 0.2s ease;
  &:hover {
    border: 2px solid ${editorStyle.primary500};
  }
`;
export const LeftWrapper = styled.div`
  background-color: ${editorStyle.primary600};
  border-radius: 0.2rem;
  padding: 0.2rem;
`;

export const RightWrapper = styled.div`
  background-color: ${editorStyle.primary600};
  border-radius: 0.2rem;
  padding: 0.2rem;
`;
export const ContentWrapper = styled.div`
  grid-column: 1/-1;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: subgrid;
  word-break: break-all;
`;

export const ColorItemWrapper = styled.div<{ $isSelected: boolean }>`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0.1rem;
  justify-content: space-between;
  transition: all 0.2s ease;
  border-top: 1px solid ${editorStyle.secondary500};
  border-left: 1px solid ${editorStyle.secondary500};
  border-right: 1px solid ${editorStyle.secondary500};
  cursor: pointer;
  &:last-of-type {
    border-bottom: 1px solid ${editorStyle.secondary500};
  }
  &:hover {
    color: ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
  }
  ${(props) =>
    props.$isSelected &&
    css`
      color: ${editorStyle.primary500};
      background-color: ${editorStyle.secondary500};
    `}
`;
export const DeleteColor = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: brightness(0.8);
  }
`;
export const ColorCard = styled.div<{
  $backgroundColor: string;
  $textColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 0.8rem;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  word-break: keep-all;
`;

export const ColorListWrapper = styled.div``;
