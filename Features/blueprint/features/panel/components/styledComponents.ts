"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import styled, { css } from "styled-components";

const NavItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
const NavButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.4rem;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  padding: 0.2rem 0.4rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    filter: brightness(0.7);
  }

  ${(props) =>
    props.$isActive &&
    css`
      filter: brightness(0.7);
    `};
`;
export { NavButton, NavItemContainer };
