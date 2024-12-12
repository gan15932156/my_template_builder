"use client";
import CreateButton from "./CreateButton";
import Table from "./Table";
import styles from "./Dashboard.module.css";
const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <CreateButton />
      <Table />
    </div>
  );
};

export default Dashboard;
