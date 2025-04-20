"use client";

import styled from "styled-components";
import { getBgTextStyle } from "@/Features/blueprint/constants/editorStyle";
import {
  ActionNavButton,
  NavButton,
  NavItemContainer,
} from "./styledComponents";
import { IoMdDownload } from "react-icons/io";
import { IoColorPaletteOutline, IoSaveOutline } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { BiCustomize } from "react-icons/bi";
import { FaBorderNone, FaBuffer, FaCircleInfo } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  changePanel,
  selectCurrentPanel,
  selectIsUseBorder,
  toggleIsUseBorder,
} from "@/Features/blueprint/slice/panelSlice";
import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";
import useSaveBlueprint from "@/Features/blueprint/hooks/useSaveBlueprint";
import AddThemeButton from "./AddThemeButton";
import { downloadCodeZip } from "../../editor/utils/utils";
export const ICON_SIZE = 18;
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
  const currentBlueprint = useAppSelector(selectBlueprint);
  const isUseBorder = useAppSelector(selectIsUseBorder);
  const currentPanel = useAppSelector(selectCurrentPanel);
  const dispatch = useAppDispatch();
  const {
    blueprintMutate: { mutate, isPending },
  } = useSaveBlueprint();
  const handleClick = (newPanel: string) => {
    dispatch(changePanel(newPanel));
  };
  const handleToggleHideShowBorder = () => {
    dispatch(toggleIsUseBorder());
  };
  const handleSave = () => {
    if (currentBlueprint) {
      mutate(currentBlueprint);
    }
  };
  const handleExport = async () => {
    if (currentBlueprint) {
      await downloadCodeZip(currentBlueprint);
    }
  };
  return (
    <Wrapper>
      <div></div>
      <NavItemContainer>
        <ActionNavButton
          title="Export to code button"
          disabled={isPending}
          onClick={handleExport}
        >
          <IoMdDownload size={ICON_SIZE} />
        </ActionNavButton>
        <ActionNavButton
          title="Save button"
          disabled={isPending}
          onClick={handleSave}
        >
          <IoSaveOutline size={ICON_SIZE} />
        </ActionNavButton>
        <ActionNavButton
          title="Toggle hide/show border element"
          disabled={isPending}
          onClick={handleToggleHideShowBorder}
          $isActive={isUseBorder}
        >
          <FaBorderNone size={ICON_SIZE} />
        </ActionNavButton>
        <AddThemeButton isPending={isPending} />
      </NavItemContainer>
      <NavItemContainer>
        <NavButton
          title="Block manager"
          disabled={isPending}
          onClick={() => handleClick("block")}
          $isActive={currentPanel == "block"}
        >
          <LuLayoutGrid size={ICON_SIZE} />
        </NavButton>
        <NavButton
          title="Layout manager"
          disabled={isPending}
          onClick={() => handleClick("layout")}
          $isActive={currentPanel == "layout"}
        >
          <FaBuffer size={ICON_SIZE} />
        </NavButton>
        <NavButton
          title="Style manager"
          disabled={isPending}
          onClick={() => handleClick("style")}
          $isActive={currentPanel == "style"}
        >
          <IoColorPaletteOutline size={ICON_SIZE} />
        </NavButton>
        <NavButton
          title="Color variable manager"
          disabled={isPending}
          onClick={() => handleClick("colorVar")}
          $isActive={currentPanel == "colorVar"}
        >
          <BiCustomize size={ICON_SIZE} />
        </NavButton>
        <NavButton
          title="Attribute manager"
          disabled={isPending}
          onClick={() => handleClick("attr")}
          $isActive={currentPanel == "attr"}
        >
          <FaCircleInfo size={ICON_SIZE} />
        </NavButton>
      </NavItemContainer>
    </Wrapper>
  );
};

export default TopPanel;
