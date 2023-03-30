import styles from "./styles.module.css";

const ConnectButton = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className={styles.connect}>
      {title}
    </button>
  );
};

export default ConnectButton;
