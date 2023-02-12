import styles from "../styles/Tweet.module.css";
import User from "./User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Tweet(props) {
  const user = useSelector((state) => state.user);

  const coeurclik = () => {
    let newike = {};
    if (props.isLIKED) {
      newike = {
        userIDS: props.like.filter((data) => data !== user.userID),
        tweetID: props._id,
      };
    } else {
      newike = { tweetID: props._id, userIDS: user.userID };
    }

    fetch("http://localhost:3000/tweets/newlike", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newike),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          settweetsData(data.tweets);
        }
      });
  };
  let coeurStyle = {};
  if (props.isLIKED) {
    coeurStyle = { color: "#FA8072" };
  }
  return (
    <div>
      <div className={styles}></div>
      <User {...props.user} />
      <p>{props.date}</p>
      <p>
        {props.texte}
        <span></span>
      </p>
      <FontAwesomeIcon
        onClick={() => coeurclik()}
        style={coeurStyle}
        icon={faHeart}
      />
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
}

export default Tweet;
