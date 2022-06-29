import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../../Auth/authentication-context.js"
import ProfilePopup from "../../Components/Profile-Popup/profile-popup.jsx"
import "./header.css"

const Header = () => {
  const navigate = useNavigate()
  const { signUp, user, } = useUserAuth();
  const [showPopup, setShowPopup] = useState(false)

  const profileContainer = {
    backgroundImage: `url(${user?.photoURL})`
  }

  const handleClick = () => {
    setShowPopup(showPopup => showPopup = !showPopup)
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <h1>Chatter</h1>
        </Link>
      </div>
      <div className="header-right">
        <div
         className="header-right-profile-container"
         style={profileContainer}
         onClick={handleClick}
        >
        {showPopup && <ProfilePopup />}
        </div>
      </div>
    </header>
  )
}

export default Header
