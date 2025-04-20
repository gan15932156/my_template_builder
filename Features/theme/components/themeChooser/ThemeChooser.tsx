"use client";

import styled from "styled-components";
import { TTheme } from "../../types";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { MouseEvent } from "react";
import ColorPaletteList from "./ColorPaletteList";

interface Props {
  themes: TTheme[];
  onApplyTheme: (themes: TTheme) => void;
  onClose: () => void;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100%;
  max-height: 84vh;
  flex-wrap: wrap;
  overflow: scroll;
`;
const Item = styled.div`
  background-color: ${editorStyle.white200};
  padding: 0.2rem;
  border-radius: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;
const ApplyButton = styled.button`
  border: 1px solid ${editorStyle.primary300};
  color: ${editorStyle.primary300};
  background-color: transparent;
  padding-block: 0.2rem;
  padding-inline: 0.6rem;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid ${editorStyle.primary500};
    color: ${editorStyle.primary500};
    background-color: ${editorStyle.secondary500};
  }
`;
const ThemeChooser: React.FC<Props> = ({ themes, onApplyTheme, onClose }) => {
  return (
    <Wrapper>
      {themes.map((theme) => (
        <ThemeItem
          key={theme.id}
          theme={theme}
          onApplyTheme={onApplyTheme}
          onClose={onClose}
        />
      ))}
    </Wrapper>
  );
};

export default ThemeChooser;

const ThemeItem: React.FC<{
  theme: TTheme;
  onApplyTheme: (themes: TTheme) => void;
  onClose: () => void;
}> = ({ theme, onApplyTheme, onClose }) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onApplyTheme(theme);
    onClose();
  };
  return (
    <Item key={theme.id}>
      {theme.name !== null && theme.name !== "" ? theme.name : "[THEME_NAME]"}
      {theme.colorVars && <ColorPaletteList colorPalette={theme.colorVars} />}
      <ApplyButton onClick={handleClick}>Apply</ApplyButton>
    </Item>
  );
};
