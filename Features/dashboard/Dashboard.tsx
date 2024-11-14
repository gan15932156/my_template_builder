import CreateButton from "./CreateButton";
import Table from "./Table";
const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "1.6rem",
      }}
    >
      <p>[Dashbaord project display]</p>
      <CreateButton />
      <Table />
    </div>
  );
};

export default Dashboard;
