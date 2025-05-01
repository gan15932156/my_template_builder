"use client";
import { DashboardWrapper } from "../theme/components/Dashboard";
import CreateButton from "./CreateButton";
import Table from "./Table";
const Dashboard: React.FC = () => {
  return (
    <DashboardWrapper>
      <CreateButton />
      <Table />
    </DashboardWrapper>
  );
};

export default Dashboard;
