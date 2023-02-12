import styles from "../styles/Trend.module.css";

function Trend(props) {
  return (
    <div className={styles.container}>
      <p>{props.name}</p>
      <p>{props.tweets.length}</p>
    </div>
  );
}

export default Trend;
