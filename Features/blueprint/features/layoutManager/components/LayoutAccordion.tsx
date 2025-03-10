"use client";

import { MouseEvent, useState } from "react";
import { TBlueprintElement } from "../../blockManager/type";
import AccordionHead from "./AccordionHead";
import styled, { css } from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import useSelectedElement from "../../../hooks/useSelectedElement";

interface Props {
  element: TBlueprintElement;
}
const AccordionContentWrapper = styled.div<{ $isActive: boolean }>`
  ${(props) =>
    props.$isActive
      ? css`
          display: initial;
        `
      : css`
          display: none;
        `};
`;
const Wrapper = styled.div`
  padding: 0.1rem;
  background-color: ${editorStyle.secondary500};
  color: ${editorStyle.primary500};
  font-size: 0.8rem;
  cursor: pointer;
`;
const LayoutAccordion: React.FC<Props> = ({ element }) => {
  const [isActive, setIsActive] = useState(false);
  const {
    layoutSelectedElementId,
    selectedElementId,
    handleSetlayoutSelectedElementId,
    handleSetSelectedElementId,
  } = useSelectedElement();
  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };
  const handleOnMouseEnterWrapepr = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (layoutSelectedElementId != element.id) {
      handleSetlayoutSelectedElementId(element.id);
    }
  };
  const handleOnMouseLeaveWrapper = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleSetlayoutSelectedElementId("");
  };
  const handleOnClickWrapper = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (element.id === selectedElementId) {
      handleSetSelectedElementId("");
    } else {
      handleSetSelectedElementId(element.id);
    }
  };
  if (!element) return null;
  return (
    <Wrapper
      onMouseEnter={handleOnMouseEnterWrapepr}
      onMouseLeave={handleOnMouseLeaveWrapper}
      onClick={handleOnClickWrapper}
    >
      <AccordionHead
        elementId={element.id}
        isActive={isActive}
        isHaveChild={
          Array.isArray(element.content) && element.content.length > 0
        }
        toggle={handleToggle}
        headingName={element.elmType}
      />
      {Array.isArray(element.content) && element.content.length > 0 && (
        <AccordionContentWrapper $isActive={isActive}>
          {element.content.map((item) => (
            <LayoutAccordion key={item.id} element={item} />
          ))}
        </AccordionContentWrapper>
      )}
    </Wrapper>
  );
};

export default LayoutAccordion;
