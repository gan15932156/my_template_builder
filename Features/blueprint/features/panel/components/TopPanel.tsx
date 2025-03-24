"use client";

import styled from "styled-components";
import { getBgTextStyle } from "@/Features/blueprint/constants/editorStyle";
import {
  ActionNavButton,
  NavButton,
  NavItemContainer,
} from "./styledComponents";
import { IoColorPaletteOutline, IoSaveOutline } from "react-icons/io5";
import { LuLayoutGrid } from "react-icons/lu";
import { FaBuffer, FaCircleInfo } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  changePanel,
  selectCurrentPanel,
} from "@/Features/blueprint/slice/panelSlice";
import { selectBlueprint } from "@/Features/blueprint/slice/elementSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "@/types/types";
import { TBlueprint } from "../../blockManager/type";
const ICON_SIZE = 18;
const Wrapper = styled.div`
  ${getBgTextStyle}
  grid-column: 1 / -1;
  grid-row: 1/2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.2rem;
`;
const saveBlueprint = (
  blueprint: TBlueprint
): Promise<ApiResponse<TBlueprint>> =>
  fetch(`/api/blueprint/${blueprint.id}`, {
    method: "PATCH",
    body: JSON.stringify(blueprint),
  }).then((response) => response.json());
const TopPanel = () => {
  const queryClient = useQueryClient();
  const currentBlueprint = useAppSelector(selectBlueprint);
  const currentPanel = useAppSelector(selectCurrentPanel);
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: saveBlueprint,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["blueprint-editor", data.data?.id],
      });
    },
  });
  const handleClick = (newPanel: string) => {
    dispatch(changePanel(newPanel));
  };

  const handleSave = () => {
    if (currentBlueprint) {
      mutate(currentBlueprint);
    }
  };
  return (
    <Wrapper>
      <div>[NAV1]</div>
      <NavItemContainer>
        <ActionNavButton
          title="Save button"
          disabled={isPending}
          onClick={handleSave}
        >
          <IoSaveOutline size={ICON_SIZE} />
        </ActionNavButton>
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
          title="Attribute manager"
          disabled={isPending}
          onClick={() => handleClick("attr")}
          $isActive={currentPanel == "attr"}
        >
          <FaCircleInfo size={ICON_SIZE} />
        </NavButton>
        <NavButton
          title="Style manager"
          disabled={isPending}
          onClick={() => handleClick("style")}
          $isActive={currentPanel == "style"}
        >
          <IoColorPaletteOutline size={ICON_SIZE} />
        </NavButton>
      </NavItemContainer>
    </Wrapper>
  );
};

export default TopPanel;
