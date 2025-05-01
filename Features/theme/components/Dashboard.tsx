"use client";

import styled from "styled-components";
import Table from "./Table";
import CreateThemeButton from "./CreateThemeButton";

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
  padding-top: 1.2rem;
`;
const Dashboard = () => {
  return (
    <DashboardWrapper>
      <CreateThemeButton />
      <Table />
    </DashboardWrapper>
  );
};

export default Dashboard;
