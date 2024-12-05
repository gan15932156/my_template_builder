"use client";
import CreateButton from "./CreateButton";
import Table from "./Table";
import styles from "./Dashboard.module.css";
const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.butttonContainer}>
        <CreateButton />
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;
