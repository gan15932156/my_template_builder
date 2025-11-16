"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectImageModal, toggleImageModal } from "@/libs/imageModalSlice";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
const Overlay = styled.div`
  position: fixed;
  z-index: 990;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;
const Wrapper = styled.div`
  position: absolute;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--background200);
  max-width: 70vw;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  border-radius: 100vw;
  padding: 1rem;
  background-color: #ffffff;
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 1rem;
  top: 1rem;
  transition: all 0.2s ease;
  &:hover {
    background-color: red;
  }
`;
const Img = styled.img`
  object-fit: cover;
  width: 80%;
  display: block;
`;

const ImageModal: React.FC = () => {
  const imageModalState = useAppSelector(selectImageModal);
  const dispatch = useAppDispatch();
  const myDivRef = useRef<HTMLDivElement | null>(null);
  const closeModal = () => dispatch(toggleImageModal(false));
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        myDivRef.current &&
        !myDivRef.current?.contains(event.target as Node)
      ) {
        closeModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [myDivRef]);

  return imageModalState.isOpen
    ? createPortal(
        <Overlay>
          <Wrapper ref={myDivRef}>
            <CloseButton onClick={closeModal}>X</CloseButton>
            {imageModalState.imageUrl != "" && (
              <Img src={imageModalState.imageUrl} />
            )}
          </Wrapper>
        </Overlay>,
        document.body
      )
    : null;
};

export default ImageModal;
