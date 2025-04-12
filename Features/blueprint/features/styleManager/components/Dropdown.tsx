"use client";

import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  margin-inline: auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 0;
  transform: translateY(calc(-100% - 10px));
  z-index: 999;
`;
const DropdownInnerWrapper = styled.div`
  margin-inline: auto;
  display: flex;
  width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const DropdownContentWrapper = styled.div`
  position: relative;
  white-space: nowrap;
  border-radius: 0.4rem;
  padding: 0.2rem;
`;
const Dropdown = ({
  showDropdown,
  content,
  children,
}: {
  showDropdown: boolean;
  content: ReactNode;
  children: ReactNode;
}) => {
  const tooltipContentRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updateTooltipPosition = () => {
    if (tooltipContentRef.current && tooltipRef.current) {
      const rect = tooltipContentRef.current.getBoundingClientRect();

      let { top, left, right } = rect;
      const padding = 40;

      // overflowing from left side
      if (left < 0 + padding) {
        const newLeft = Math.abs(left) + padding;
        tooltipContentRef.current.style.left = `${newLeft}px`;
      }
      // overflowing from right side
      else if (right + padding > window.innerWidth) {
        const newRight = right + padding - window.innerWidth;
        tooltipContentRef.current.style.right = `${newRight}px`;
      }

      // overflowing from top side
      if (top < 0) {
        // unset top and set bottom
        tooltipRef.current.style.top = "unset";
        tooltipRef.current.style.bottom = "0";
        tooltipRef.current.style.transform = "translateY(calc(100% + 10px))";
      }
    }
  };
  useEffect(() => {
    updateTooltipPosition();
  }, [showDropdown]);
  return (
    <Wrapper>
      {showDropdown && (
        <DropdownWrapper ref={tooltipRef}>
          <DropdownInnerWrapper>
            <DropdownContentWrapper ref={tooltipContentRef}>
              {content}
            </DropdownContentWrapper>
          </DropdownInnerWrapper>
        </DropdownWrapper>
      )}
      {children}
    </Wrapper>
  );
};

export default Dropdown;
