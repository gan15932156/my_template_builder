"use client";

import styled from "styled-components";
import Table from "./Table";
import CreateThemeButton from "./CreateThemeButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
  padding-top: 1.2rem;
`;
const Dashboard = () => {
  return (
    <Wrapper>
      <CreateThemeButton />
      <Table />
    </Wrapper>
  );
};

export default Dashboard;
