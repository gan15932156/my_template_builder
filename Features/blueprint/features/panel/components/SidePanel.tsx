"use client";

import { getBgTextStyle } from "@/Features/blueprint/constants/editorStyle";
import styled from "styled-components";
import BlockManager from "../../blockManager/components/BlockManager";
import SidePanelItem from "./SidePanelItem";
import StyleManager from "../../styleManager/components/StyleManager";
import LayoutManager from "../../layoutManager/components/LayoutManager";
import AttributeManager from "../../attributeManager/components/AttributeManager";
import ColorVarManager from "../../colorVarManager/components/ColorVarManager";

const Wrapper = styled.div`
  ${getBgTextStyle}
  padding:.2rem;
  /* overflow-y: scroll; */
`;
const SidePanel = () => {
  return (
    <Wrapper>
      <SidePanelItem name="block">
        <BlockManager />
      </SidePanelItem>
      <SidePanelItem name="layout">
        <LayoutManager />
      </SidePanelItem>
      <SidePanelItem name="attr">
        <AttributeManager />
      </SidePanelItem>
      <SidePanelItem name="colorVar">
        <ColorVarManager />
      </SidePanelItem>
      <SidePanelItem name="style">
        <StyleManager />
      </SidePanelItem>
    </Wrapper>
  );
};

export default SidePanel;
