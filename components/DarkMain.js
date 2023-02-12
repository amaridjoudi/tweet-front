import styles from "../styles/DarkMain.module.css";
import User from "./User";
import Tweet from "./Tweet";
import Trend from "./Trend";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DarkMain() {
  const user = useSelector((state) => state.user);

  const [tweetsData, settweetsData] = useState([]);
  const [trenndData, settrenndData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets/alltweet")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          settweetsData(data.tweets);
        }
      });

    fetch("http://localhost:3000/trends/alltrend")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          settrenndData(data.trend);
        }
      });
  }, []);

  const tweets = tweetsData.map((data, i) => {
    const isLIKED = data.like.includes(user.userID);
    return <Tweet key={i} {...data} isLIKED={isLIKED} />; //data renvoie les props a recuperer a travers la function avec proprs
  });

  const trends = trenndData.map((data, i) => {
    return <Trend key={i} {...data} />; //data renvoie les props a recuperer a travers la function avec proprs
  });

  return (
    <div>
      <User {...user} />
      {tweets}
      {trends}
      <div className={styles}></div>
      <div className={styles}> </div>
      <div className={styles}></div>
    </div>
  );
}

export default DarkMain;
