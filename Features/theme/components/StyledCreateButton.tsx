"use client";
import styled from "styled-components";

const StyledCreateButton = styled.button`
  cursor: pointer;
  padding-inline: 1.2rem;
  padding-block: 0.4rem;
  color: var(--background);
  text-decoration: none;
  transition: background-color 0.3s, border 0.3s;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  background-color: var(--success);
  &:hover {
    background-color: var(--success300);
    border: 1px solid white;
  }
`;
export default StyledCreateButton;
