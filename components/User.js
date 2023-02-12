import styles from "../styles/User.module.css";
import Image from "next/image";

function User(props) {
  return (
    <div className={styles.container}>
      <Image
        className={styles}
        src="/user.jpeg"
        alt="image utilisateur"
        width={50}
        height={50}
      />
      <p>{props.firstname}</p>
      <p>{props.username}</p>
    </div>
  );
}

export default User;
