import { useState } from "react";
import { auth } from "../../firebase-config.js"
import { useUserAuth } from "../../Auth/authentication-context.js";
import { updateProfile, getIdTokenResult, reload } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import ProfileImage from "../../Assets/Images/undraw_profile_pic_ic-5-t.svg";
import "./sign-up.css";

const SignUp = ({ changeLoginState }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registering, setRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)

  const { signUp, user } = useUserAuth();

  const handleChange = (e) => {
    const target = e.target;
    const value = e.target.value;
    switch (target.id) {
      case "username":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.log("yay!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    setErrorState(false)
    try {
      await signUp(email, password);
      await handleUpdateProfile()
      setRegistering(false);
      navigate("/chat");
    } catch (error) {
      const code = error.code
      handleErrors(code)
      console.log(error.code);
      setRegistering(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: ProfileImage,
      });
    } catch(error) {
      console.log(error)
    }
  };

  const handleErrors = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-exists":
        setErrorState(true)
        setErrorMessage("Error: Email already exists")
        break;
      case "auth/invalid-email":
        setErrorState(true)
        setErrorMessage("Error: Invalid Email Address")
        break;
      case "auth/weak-password":
        setErrorState(true)
        setErrorMessage("Error: Password must be at least 6 chars long")
        break;
      default:
        setErrorState(true)
        setErrorMessage("Oops. Something went wrong. Please Try Again")
    }
  }

  return (
    <>
      <h2>Create Your Account</h2>
      <div className="sign-up-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-input-container">
            <label htmlFor="Username">Username</label>
            <input
              id="username"
              value={userName}
              type="text"
              onChange={handleChange}
              placeholder="username"
              maxLength='20'
              required
            />
          </div>
          <div className="form-input-container">
            <label htmlFor="Email">Email</label>
            <input
              id="email"
              value={email}
              type="email"
              onChange={handleChange}
              placeholder="email"
              maxLength='24'
              required
            />
          </div>
          <div className="form-input-container">
            <label htmlFor="Password">Password</label>
            <input
              id="password"
              value={password}
              type="password"
              onChange={handleChange}
              placeholder="password"
              maxLength='24'
              required
            />
          </div>
          <input
            className={registering
             ? "btn-submit logging-in"
             : "btn-submit"
            }
            type="submit"
            value={registering
              ? "Signing Up..."
              : "Sign Up!"}
          />
        </form>
        {errorState && <span className='error-msg'>{errorMessage}</span>}
      </div>
      <div className="account-switch-container">
        <p className="no-account-text">
          Already have an account?
          <span>
            <button onClick={changeLoginState}>Login Here.</button>
          </span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
