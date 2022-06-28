import {useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../../Auth/authentication-context.js"
import HeroImage from "../../Assets/Images/undraw_real_time_collaboration_c62i.svg"
import Login from "../Login/login.jsx"
import "./homepage.css"

const HomePage = () => {

  const { user } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat")
    }
  }, [])

  return (
    <>
    <div className="homepage-container">
      <div className="homepage-left">
        <div className="homepage-left-hero-text">
          <h1>Chatter</h1>
          <p>Real Time Messaging App. Talk with your friends!</p>
        </div>
        <div className="homepage-left-hero-img-container">
          <img src={HeroImage} alt=""/>
        </div>
      </div>
      <div className="homepage-right">
        <Login />
        <Link to="/register">
          SignUp
        </Link>
        <Link to="/login">
          Login
        </Link>
      </div>
    </div>
    </>
  )
}

export default HomePage
