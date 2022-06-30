import { useState } from 'react'
import { useUserAuth } from "../../Auth/authentication-context.js"
import { updateProfile } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
import ProfileImage from "../../Assets/Images/undraw_profile_pic_ic-5-t.svg"
import "./sign-up.css"

const SignUp = ({changeLoginState}) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const { signUp, user } = useUserAuth();

  const handleChange = (e) => {
    const target = e.target
    const value = e.target.value
    switch (target.id) {
      case 'username':
        setUserName(value)
      break;
      case 'email':
        setEmail(value)
      break;
      case 'password':
        setPassword(value)
      break;
      default:
      console.log('yay!')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password)
      await handleUpdateProfile()
      navigate('/chat')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleUpdateProfile = async () => {
    await updateProfile(user, {
      displayName: userName,
      photoURL: ProfileImage
    })
  }

  return (
    <>
    <h2>Create Your Account</h2>
    <div className="sign-up-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-input-container">
          <label htmlFor="Username">Username</label>
          <input
            id='username'
            value={userName}
            type="text"
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="Email">Email</label>
          <input
            id='email'
            value={email}
            type="email"
            onChange={handleChange}
            placeholder="email"
            required
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="Password">Password</label>
          <input
            id='password'
            value={password}
            type="password"
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        <input
          className="btn-submit"
          type="submit"
          value="Sign Up!"
        />
      </form>
    </div>
    <div className="account-switch-container">
      <p className='no-account-text'>
        Already have an account?
        <span>
          <button onClick={changeLoginState}>
            Login Here.
          </button>
        </span>
      </p>
    </div>
    </>
  )
}

export default SignUp
