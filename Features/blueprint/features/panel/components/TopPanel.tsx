"use client";

import styled from "styled-components";
import { getBgTextStyle } from "@/Features/blueprint/constants/editorStyle";
import { NavButton, NavItemContainer } from "./styledComponents";
import { FiBox, FiChrome } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  changePanel,
  selectCurrentPanel,
} from "@/Features/blueprint/slice/panelSlice";
const Wrapper = styled.div`
  ${getBgTextStyle}
  grid-column: 1 / -1;
  grid-row: 1/2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
`;

const TopPanel = () => {
  const currentPanel = useAppSelector(selectCurrentPanel);
  const dispatch = useAppDispatch();

  const handleClick = (newPanel: string) => {
    dispatch(changePanel(newPanel));
  };
  return (
    <Wrapper>
      <div>[NAV1]</div>
      <NavItemContainer>
        <NavButton
          title="Block manager"
          onClick={() => handleClick("block")}
          $isActive={currentPanel == "block"}
        >
          <FiChrome size={16} />
        </NavButton>
        <NavButton
          title="Style manager"
          onClick={() => handleClick("style")}
          $isActive={currentPanel == "style"}
        >
          <FiBox size={16} />
        </NavButton>
      </NavItemContainer>
    </Wrapper>
  );
};

export default TopPanel;
