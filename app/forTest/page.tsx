"use client";

// import React, { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import styled from "styled-components";
// interface TooltipProps {
//   targetRef: React.RefObject<HTMLElement>;
//   tooltipRef: React.RefObject<HTMLDivElement>;
//   children: React.ReactNode;
//   isActive: boolean;
// }
// const Image = styled.img`
//   width: 150px;
//   height: 150px;
//   cursor: pointer;
//   border: 2px solid lightblue;
//   border-radius: 8px;
//   position: absolute;
//   top: 50%;
//   left: 50%;
// `;
// const TooltipContainer = styled.div<{ $top: number; $left: number }>`
//   position: absolute;
//   top: ${(props) => props.$top}px;
//   left: ${(props) => props.$left}px;
//   background: rgba(0, 0, 0, 0.8);
//   color: white;
//   padding: 5px 10px;
//   border-radius: 4px;
//   white-space: nowrap;
//   z-index: 1000;
//   pointer-events: none;
//   transform: translate(-50%, -100%); /* Center horizontally */
// `;

// const Tooltip: React.FC<TooltipProps> = ({
//   targetRef,
//   children,
//   isActive,
//   tooltipRef,
// }) => {
//   const [position, setPosition] = useState({ top: 0, left: 0 });

//   useEffect(() => {
//     if (!targetRef.current || !isActive) return;

//     const rect = targetRef.current.getBoundingClientRect();
//     setPosition({
//       top: rect.bottom + window.scrollY - rect.height,
//       left: rect.left + window.scrollX + rect.width / 2,
//     });
//   }, [targetRef, isActive]);

//   return isActive
//     ? createPortal(
//         <TooltipContainer
//           ref={tooltipRef}
//           $top={position.top}
//           $left={position.left}
//         >
//           {children}
//         </TooltipContainer>,
//         document.body
//       )
//     : null;
// };

// const Wrapper: React.FC = () => {
//   const targetRef = useRef<HTMLImageElement>(null);
//   const tooltipRef = useRef<HTMLDivElement>(null);
//   const [isActive, setIsActive] = useState(false);

//   const handleActive = () => {
//     setIsActive((prev) => !prev);
//   };

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         tooltipRef.current &&
//         !tooltipRef.current.contains(event.target as Node) &&
//         targetRef.current &&
//         !targetRef.current.contains(event.target as Node)
//       ) {
//         setIsActive(false);
//       }
//     }

//     if (isActive) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isActive]);

//   return (
//     <>
//       <Image
//         src="https://placehold.co/600x400"
//         alt="Image"
//         width={240}
//         height={120}
//         ref={targetRef}
//         onClick={handleActive} // Toggle tooltip on click
//       />
//       <Tooltip
//         targetRef={targetRef}
//         isActive={isActive}
//         tooltipRef={tooltipRef} // Pass tooltipRef
//       >
//         <TooltipPanel />
//       </Tooltip>
//     </>
//   );
// };

// const Page = () => {
//   return <Wrapper />;
// };

// export default Page;

// const TooltipPanel = () => {
//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     console.log("hanele Click");
//   };
//   return (
//     <div>
//       <p>Panel</p>
//       <button onClick={handleClick}>Click me</button>
//     </div>
//   );
// };

import { createPortal } from "react-dom";

const Page = () => {
  return (
    <div style={{ border: "1px solid red" }}>
      <SomeComponent />
    </div>
  );
};

export default Page;

const SomeComponent = () => {
  return createPortal(
    <div>
      <button
        onClick={() => {
          console.log("asd");
        }}
      >
        Clikc
      </button>
    </div>,
    document.body
  );
};
