"use client";

import { getBgTextStyle } from "@/Features/blueprint/constants/editorStyle";
import styled from "styled-components";
import BlockManager from "../../blockManager/components/BlockManager";
import SidePanelItem from "./SidePanelItem";
import StyleManager from "../../styleManager/components/StyleManager";

const Wrapper = styled.div`
  ${getBgTextStyle}
  padding:.2rem;
`;
const SidePanel = () => {
  return (
    <Wrapper>
      <SidePanelItem name="block">
        <BlockManager />
      </SidePanelItem>
      <SidePanelItem name="style">
        <StyleManager />
      </SidePanelItem>
    </Wrapper>
  );
};

export default SidePanel;