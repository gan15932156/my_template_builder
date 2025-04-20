"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled, { css } from "styled-components";

const NavItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
const ActionNavButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  border-radius: 0.2rem;
  border: 1px solid ${editorStyle.secondary500};
  color: ${editorStyle.secondary500};
  background-color: ${editorStyle.primary500};
  padding: 0.1rem 0.2rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${editorStyle.primary500};
    color: ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
  }
  &:active,
  &:disabled {
    filter: brightness(0.4);
    cursor: not-allowed;
  }
  ${(props) =>
    props.$isActive &&
    css`
      border: 1px solid ${editorStyle.primary500};
      color: ${editorStyle.primary500};
      background-color: ${editorStyle.secondary500};
    `}
`;
const NavButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  border: 1px solid ${editorStyle.secondary500};
  color: ${editorStyle.secondary500};
  background-color: ${editorStyle.primary500};
  padding: 0.1rem 0.2rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${editorStyle.primary500};
    color: ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
  }
  &:active,
  &:disabled {
    filter: brightness(0.4);
    cursor: not-allowed;
  }

  ${(props) =>
    props.$isActive &&
    css`
      border: 1px solid ${editorStyle.primary500};
      color: ${editorStyle.primary500};
      background-color: ${editorStyle.secondary500};
    `};
`;
export { NavButton, ActionNavButton, NavItemContainer };
