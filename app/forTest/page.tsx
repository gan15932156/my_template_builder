"use client";

import { read } from "fs";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
interface TooltipProps {
  targetRef: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  isActive: boolean;
}
const Image = styled.img`
  width: 150px;
  height: 150px;
  cursor: pointer;
  border: 2px solid lightblue;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
`;
const TooltipContainer = styled.div<{ $top: number; $left: number }>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1000;
  pointer-events: none;
  transform: translate(-50%, -100%); /* Center horizontally */
`;

const Tooltip: React.FC<TooltipProps> = ({ targetRef, children }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleMouseEnter = () => {
      const rect = target.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY - rect.height,
        left: rect.left + window.scrollX + rect.width / 2,
      });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    target.addEventListener("mouseenter", handleMouseEnter);
    target.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      target.removeEventListener("mouseenter", handleMouseEnter);
      target.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [targetRef]);

  if (!visible) return null;

  return createPortal(
    <TooltipContainer $top={position.top} $left={position.left}>
      {children}
    </TooltipContainer>,
    document.body
  );
};

const Wrapper: React.FC = () => {
  const targetRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleActive = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <React.Fragment>
      <Image
        src="https://placehold.co/600x400"
        alt="asdadsd"
        width={240}
        height={120}
        ref={targetRef}
        onClick={handleActive}
      />
      <Tooltip targetRef={targetRef} isActive={isActive}>
        <TooltipPanel />
      </Tooltip>
    </React.Fragment>
  );
};

const Page = () => {
  return <Wrapper />;
};

export default Page;

const TooltipPanel = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("hanele Click");
  };
  return (
    <div>
      <p>Panel</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
