import { useState } from "react";
import { useUserAuth } from "../../Auth/authentication-context.js";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = ({ changeLoginState }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorState, setErrorState] = useState(false)

  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorState(false);
    setLoggingIn(true);
    try {
      await logIn(email, password);
      setLoggingIn(false);
      navigate("/chat");
    } catch (error) {
      const code = error.code
      console.log(error.code)
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
      <h2>Login To Chat</h2>
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
            ? "Logging in..."
            : "Login"}
          />
        </form>
        {errorState && <span className='error-msg'>{errorMessage}</span>}
      </div>
      <div className="account-switch-container">
        <p className="no-account-text">
          Don't have an account?
          <span>
            <button onClick={changeLoginState}>Register Here.</button>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
