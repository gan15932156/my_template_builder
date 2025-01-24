import CreateButton from "./CreateButton";
import styles from "./Dashboard.module.css";
import Table from "./Table";
const Dashbaord = () => {
  return (
    <div className={styles.container}>
      <CreateButton />
      <Table />
    </div>
  );
};

export default Dashbaord;
