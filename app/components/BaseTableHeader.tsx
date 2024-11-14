import styles from "./BaseTableHeader.module.css";
interface Props {
  text: string;
}
const BaseTableHeader: React.FC<Props> = ({ text }) => {
  return <span className={styles.tableCell}>{text}</span>;
};

export default BaseTableHeader;
