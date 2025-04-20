"use client";

import { IoColorFillOutline } from "react-icons/io5";
import Dropdown from "../../styleManager/components/Dropdown";
import { ActionNavButton } from "./styledComponents";
import { ICON_SIZE } from "./TopPanel";
import { useState } from "react";
import styled from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import ThemeChooser from "@/Features/theme/components/themeChooser/ThemeChooser";
import BlueprintThemeChooser from "./BlueprintThemeChooser";
import { createPortal } from "react-dom";

interface Props {
  isPending: boolean;
}

const ContentWrapper = styled.div`
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${editorStyle.white};
  color: ${editorStyle.primary500};
  padding: 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  width: 80%;
`;
const AddThemeButton: React.FC<Props> = ({ isPending }) => {
  const [toggleDropdown, setDropdown] = useState(false);
  const handleCloseDropdown = () => setDropdown(false);
  return (
    <>
      {toggleDropdown &&
        createPortal(
          <ContentWrapper>
            <BlueprintThemeChooser onClose={handleCloseDropdown} />
          </ContentWrapper>,
          document.body
        )}
      <ActionNavButton
        title="Add theme button"
        $isActive={toggleDropdown}
        disabled={isPending}
        onClick={() => setDropdown((prev) => !prev)}
      >
        <span>Add theme</span>
        <IoColorFillOutline size={ICON_SIZE} />
      </ActionNavButton>
    </>
  );
};

export default AddThemeButton;
