import "./profile-popup.css";
import { useUserAuth } from "../../Auth/authentication-context.js";
import { useNavigate, Link } from "react-router-dom";
import { DiGithubBadge } from "react-icons/di";

const ProfilePopup = () => {
  const { signUp, user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const avatarImage = {
    backgroundImage: `url(${user?.photoURL})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="profile-popup-container">
      <div className="profile-popup-container-header">
        <div
          className="profile-popup-container-header-avatar-container"
          style={avatarImage}
        ></div>
        <h3>{user.displayName}</h3>
      </div>
      <div className="profile-popup-container-body">
        <nav>
          <ul>
            <li>
              <div className="profile-popup-nav-item">
                <Link to="/profile">Edit Profile</Link>
              </div>
            </li>
            <li>
              <div className="profile-popup-nav-item">
                <Link to="/chat">View Chat</Link>
              </div>
            </li>
            <li>
              <div className="profile-popup-nav-item">
                <a href="#">About</a>
              </div>
            </li>
            <li>
              <div className="profile-popup-nav-item">
                <a href="#">View Code</a>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="profile-popup-container-footer">
        <button onClick={handleLogout}>Logout</button>
        <a href="#">
          Chatter
          <DiGithubBadge />
        </a>
      </div>
    </div>
  );
};

export default ProfilePopup;
