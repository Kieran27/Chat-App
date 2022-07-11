import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Auth/authentication-context.js";
import HeroImage from "../../Assets/Images/undraw_real_time_collaboration_c62i.svg";
import Login from "../Login/login.jsx";
import SignUp from "../Sign-Up/sign-up.jsx";
import SigninAsTest from "../../Components/Sign-In-Test/sign-in-test.jsx";
import "./homepage.css";

const HomePage = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, []);

  const changeLoginState = () => {
    setLogin((login) => (login = !login));
  };

  return (
    <>
      <div className="homepage-container">
        <div className="homepage-left">
          <div className="homepage-left-hero-text">
            <h1>Chatter</h1>
            <p>Real Time Messaging App. Talk with your friends!</p>
          </div>
          <div className="homepage-left-hero-img-container">
            <img src={HeroImage} alt="" />
          </div>
        </div>
        <div className="homepage-right">
          <div className="homepage-right-header">
            <h1>Chatter</h1>
            <p>Real Time Messaging App. Talk with your friends!</p>
          </div>
          {login ? (
            <Login changeLoginState={changeLoginState} />
          ) : (
            <SignUp changeLoginState={changeLoginState} />
          )}
          <SigninAsTest />
        </div>
      </div>
    </>
  );
};

export default HomePage;
