import styles from "../styles/Home.module.css";
import { Info } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Button, Modal } from "antd";

function Home() {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [sinupError, setsinupError] = useState("");
  const [sininError, setsininnError] = useState("");

  const userSignnup = () => {
    //----------------------en---dessous----appel----au---bacheend----------------------------------

    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: firstname, //infos que la personne a envoye au backeend
        username: signUpUsername, //infos que la personne a envoye au backeend
        password: signUpPassword, //infos que la personne a envoye au backeend
      }),
    })
      //----------------------en---dessous----le--retour----du---bacheend----------------------------------
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            Info({
              username: signUpUsername,
              firstname: firstname,
              token: data.token,
              userID: data.userID,
            })
          );
          //----------------------en---dessous--on--remet--les--input--a-0----------------------------------

          setSignUpUsername("");
          setSignUpPassword("");
          setFirstname("");
          console.log("ok up");
          window.location.assign("/thedark"); //envoie sur la page apres verif
        } else {
          setsinupError(data.error);
        }
      });
  };
  const userSiggnin = () => {
    //----------------------en---dessous----appel----au---bacheend----------------------------------

    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      //----------------------en---dessous----le--retour----du---bacheend----------------------------------

      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //----------------------on------recupere---les---valeurs--et--les--stock---dans----redux----
          dispatch(
            Info({
              username: signInUsername,
              token: data.token,
              firstname: data.firstname,
              userID: data.userID,
            })
          );
          //----------------------en---dessous--on--remet--les--input--a-0----------------------------------

          setSignInUsername("");
          setSignInPassword("");
          console.log("ok in");
          window.location.assign("/thedark"); //envoie sur la page apres verif
        } else {
          setsininnError(data.error);
        }
      });
  };

  //---------------------------------------------------------------------------------------------------------------------

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modal = (
    <Modal
      title="Veuillez creer un compte "
      open={isModalOpen}
      onOk={userSignnup}
      onCancel={handleCancel}
    >
      <input
        type="text"
        placeholder="Firstname"
        id="signUpFirstname"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      ></input>
      <input
        type="text"
        placeholder="Username"
        id="signUpUsername"
        onChange={(e) => setSignUpUsername(e.target.value)}
        value={signUpUsername}
      ></input>
      <input
        type="password"
        placeholder="Password"
        id="signUpPassword"
        onChange={(e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
      ></input>
      {sinupError}
    </Modal>
  );

  const [isModalOpenl, setIsModalOpenl] = useState(false);

  const showModall = () => {
    setIsModalOpenl(true);
  };

  const handleCancell = () => {
    setIsModalOpenl(false);
  };

  const modall = (
    <Modal
      title="Veuillez vous connecter "
      open={isModalOpenl}
      onOk={userSiggnin}
      onCancel={handleCancell}
    >
      <input
        type="text"
        placeholder="Username"
        id="signinUsername"
        onChange={(e) => setSignInUsername(e.target.value)}
        value={signInUsername}
      ></input>
      <input
        type="password"
        placeholder="Password"
        id="signinPassword"
        onChange={(e) => setSignInPassword(e.target.value)}
        value={signInPassword}
      ></input>
      {sininError}
    </Modal>
  );

  return (
    <div className={styles.fond}>
      <div className={styles.parent}>
        {modal}
        {modall}
        <div>
          <button className={styles.button} id="register" onClick={showModal}>
            Sign'up
          </button>
        </div>
        <div>
          <button
            className={styles.button}
            id="connection"
            onClick={showModall}
          >
            Signin
          </button>
        </div>
      </div>
      <div></div>
      <main className={styles.main}></main>
    </div>
  );
}

export default Home;
