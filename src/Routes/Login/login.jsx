import { useState } from 'react'
import { useUserAuth } from "../../Auth/authentication-context.js"
import { useNavigate, Link } from "react-router-dom"
import "./login.css"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { logIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password)
      navigate("/chat")
    } catch(error) {
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    const target = e.target;
    target.id === "email"
     ? setEmail(e.target.value)
     : setPassword(e.target.value)
  }

  return (
    <>
    <h2>Login To Chat</h2>
    <p>
      Don't have an account?
      <Link to="/register">
        Register here.
      </Link>
    </p>
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="Email"></label>
        <input
          id='email'
          value={email}
          type="email"
          onChange={handleChange}
          placeholder="email"
          required
        />
        <label htmlFor="Password"></label>
        <input
          id='password'
          value={password}
          type="password"
          onChange={handleChange}
          placeholder="password"
          required
        />
        <input type="submit" value="Login"/>
      </form>
    </div>
    </>
  )
}

export default Login
