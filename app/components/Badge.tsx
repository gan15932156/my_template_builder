import styles from "./Badge.module.css";
interface Props {
  text: string;
  variant?: "primary" | "success" | "danger" | "warning";
  className?: string;
}
const Badge: React.FC<Props> = ({
  text,
  variant = "primary",
  className = "",
}) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {text}
    </span>
  );
};

export default Badge;
