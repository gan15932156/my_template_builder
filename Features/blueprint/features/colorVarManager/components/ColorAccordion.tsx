"use client";

import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { FiChevronDown } from "react-icons/fi";
import styled, { css } from "styled-components";
import { ColorVar } from "../../blockManager/type";
import ColorContent from "./ColorContent";

const Wrapper = styled.div`
  width: 100%;
`;
const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  padding-inline: 0.2rem;
  user-select: none;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};

  &:not(:last-of-type) {
    border-bottom: 1px solid ${editorStyle.primary500};
  }
`;
const ColorNameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  & > span {
    font-weight: bold;
  }
`;
const Content = styled.div<{ $isActive: boolean }>`
  display: ${(props) => (props.$isActive ? "initial" : "none")};
`;

interface Props<K extends keyof ColorVar = keyof ColorVar> {
  currentTab: string;
  colorName: K;
  colors: ColorVar;
  theme: "light" | "dark";
  toggle: (newTab: string) => void;
  updateColor: (
    newColor: string,
    colorName: K,
    colorKey: keyof ColorVar[K]
  ) => void;
}

const ColorAccordion = <K extends keyof ColorVar>({
  colorName,
  colors,
  toggle,
  currentTab,
  theme,
  updateColor,
}: Props<K>) => {
  return (
    <Wrapper>
      <Heading onClick={() => toggle(colorName)}>
        <span>{colorName}</span>

        <ColorNameWrapper>
          <ColorBadges colors={colors[colorName]} />
          <FiChevronDown
            style={{
              transform:
                currentTab === colorName ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </ColorNameWrapper>
      </Heading>
      <Content $isActive={currentTab === colorName}>
        <ColorContent
          colorName={colorName}
          colors={colors}
          updateColor={updateColor}
        />
      </Content>
    </Wrapper>
  );
};

export default ColorAccordion;

const Badge = styled.div<{ $color: string }>`
  position: relative;
  height: 1rem;
  width: 0.8rem;

  ${(props) =>
    props.$color &&
    css`
      background-color: ${props.$color};
    `}
`;
const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
`;
const ColorBadges: React.FC<{ colors: Record<string, string> }> = ({
  colors,
}) => {
  return (
    <BadgeWrapper>
      {Object.entries(colors).map(([shade, color], index) => {
        return <Badge key={index} $color={color} />;
      })}
    </BadgeWrapper>
  );
};
