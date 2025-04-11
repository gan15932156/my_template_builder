"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import AddColorPaletteForm from "./AddColorPaletteForm";
import ColorPaletteList from "./ColorPaletteList";
import { ControlButton, ControlWrapper, Wrapper } from "./StyledComponents";

const ColorVarManager = () => {
  const [isAddColor, setIsAddColor] = useState(false);
  const handleControlClick = () => {
    setIsAddColor((prev) => !prev);
  };

  return (
    <Wrapper>
      <ControlWrapper>
        <ControlButton
          onClick={handleControlClick}
          title={isAddColor ? "Back to color list" : "Add new color"}
        >
          {isAddColor ? <RiArrowGoBackFill size={24} /> : <FiPlus size={24} />}
        </ControlButton>
      </ControlWrapper>
      {isAddColor ? (
        <AddColorPaletteForm backToList={handleControlClick} />
      ) : (
        <ColorPaletteList />
      )}
    </Wrapper>
  );
};

export default ColorVarManager;
