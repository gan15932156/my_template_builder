import styles from "./Dashboard.module.css";
import CreateButton from "./CreateButton";
import Table from "./Table";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.container}>
      <CreateButton />
      <Table />
    </div>
  );
};

export default Dashboard;
