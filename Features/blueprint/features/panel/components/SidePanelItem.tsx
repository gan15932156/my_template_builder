"use client";
import { selectCurrentPanel } from "@/Features/blueprint/slice/panelSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import styled, { css } from "styled-components";

interface Props {
  children: React.ReactNode;
  name: string;
}

const Content = styled.div<{ $isActive: boolean }>`
  ${(props) =>
    props.$isActive
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;
const SidePanelItem: React.FC<Props> = ({ children, name }) => {
  const currentPanel = useAppSelector(selectCurrentPanel);
  return <Content $isActive={name == currentPanel}>{children}</Content>;
};

export default SidePanelItem;
