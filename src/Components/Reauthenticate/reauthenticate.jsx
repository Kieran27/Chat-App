import { useState } from "react";
import { useUserAuth } from "../../Auth/authentication-context.js";
import { useNavigate, Link } from "react-router-dom";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
} from 'firebase/auth'

const Reauthenticate = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)

  const { user } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorState(false);
    setLoggingIn(true);
    const credential = EmailAuthProvider.credential(
      user.email,
      password
    )
    try {
      await reauthenticateWithCredential(user, credential)
      setLoggingIn(false);
      alert("Account Successfully Authenticated!")
    } catch (error) {
      const code = error.code
      handleErrors(code);
      setLoggingIn(false);
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    setErrorState(false)
    target.id === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const handleErrors = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        setErrorState(true)
        setErrorMessage("Error: User not Found")
        break;
      case "auth/wrong-password":
        setErrorState(true)
        setErrorMessage("Error: Wrong Password")
        break;
      default:
        setErrorState(true)
        setErrorMessage("Oops. Something went wrong. Please Try Again")
    }
  }
  return (
    <>
      <h2>Reauthenticate to Continue</h2>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
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
           className={loggingIn
            ? "btn-submit logging-in"
            : "btn-submit"
           }
           type="submit"
           value={loggingIn
            ? "Authenticating..."
            : "Authenticate"}
          />
        </form>
        {errorState && <span className='error-msg'>{errorMessage}</span>}
      </div>
    </>
  );
};

export default Reauthenticate
