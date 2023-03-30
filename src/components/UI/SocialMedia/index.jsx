import styles from "./styles.module.css";

const SocialMediaButton = ({ title }) => {
  return <button className={styles.button}>{title}</button>;
};

export default SocialMediaButton;
