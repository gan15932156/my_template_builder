"use client";

import styled from "styled-components";
import BlockItem from "./BlockItem";
import { blockCategories } from "@/Features/blueprint/constants/block";
import {
  BlockGrid,
  BlockHeading,
  BlockIcon,
  BlockWrapper,
} from "./styledComponents";
import { FiChevronUp } from "react-icons/fi";
import { useState } from "react";
import useGetBlueprintBlock from "../../../hooks/useGetBlueprintBlock";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* gap: 1rem; */
`;

const BlockManager = () => {
  const { data: blueprintBlock, isLoading, isError } = useGetBlueprintBlock();
  const [currentTab, setCurrentTab] = useState("");
  const handleChangeCurrentTab = (newTab: string) => {
    if (newTab == currentTab) {
      setCurrentTab("");
    } else {
      setCurrentTab(newTab);
    }
  };
  if (isLoading)
    return (
      <Wrapper>
        <p>...</p>
      </Wrapper>
    );
  if (isError)
    return (
      <Wrapper>
        <p>Error loading blueprint. Please try again.</p>
      </Wrapper>
    );

  return (
    <Wrapper>
      {Object.keys(blockCategories).map((category) => (
        <BlockWrapper key={category}>
          <BlockHeading onClick={() => handleChangeCurrentTab(category)}>
            <span style={{ textTransform: "capitalize" }}>{category}</span>
            <BlockIcon $isActive={currentTab == category}>
              <FiChevronUp />
            </BlockIcon>
          </BlockHeading>
          <BlockGrid className="block_grid" $isActive={currentTab == category}>
            {Object.keys(blockCategories[category]).map((key) => (
              <BlockItem
                key={blockCategories[category][key].id}
                block={blockCategories[category][key]}
              />
            ))}
          </BlockGrid>
        </BlockWrapper>
      ))}
      {blueprintBlock &&
        Object.keys(blueprintBlock).map(
          (category) =>
            Object.keys(blueprintBlock[category]).length > 0 && (
              <BlockWrapper key={category}>
                <BlockHeading onClick={() => handleChangeCurrentTab(category)}>
                  <span style={{ textTransform: "capitalize" }}>
                    {category}
                  </span>
                  <BlockIcon $isActive={currentTab == category}>
                    <FiChevronUp />
                  </BlockIcon>
                </BlockHeading>
                <BlockGrid
                  className="block_grid"
                  $isActive={currentTab == category}
                >
                  {Object.keys(blueprintBlock[category]).map((key) => (
                    <BlockItem
                      key={blueprintBlock[category][key].id}
                      block={blueprintBlock[category][key]}
                    />
                  ))}
                </BlockGrid>
              </BlockWrapper>
            )
        )}
    </Wrapper>
  );
};

export default BlockManager;
