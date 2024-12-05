import styles from "./Dashboard.module.css";
import CreateButton from "./CreateButton";
import Table from "./Table";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <p>[Dashbaord component display]</p>
      <div className={styles.butttonContainer}>
        <CreateButton />
      </div>
      <Table />
    </div>
  );
};

export default Dashboard;
