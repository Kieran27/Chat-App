import { useState } from 'react'
import { useUserAuth } from "../../Auth/authentication-context.js"
import { updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
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
      handleUpdateProfile()
      navigate('/chat')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleUpdateProfile = async () => {
    await updateProfile(user, {
      displayName: userName,
      photoURL: "https://icon-library.com/images/generic-user-icon/generic-user-icon-19.jpg"
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="Username"></label>
      <input
        id='username'
        value={userName}
        type="text"
        onChange={handleChange}
        placeholder="username"
        required
      />
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
      <input type="submit" value="Sign Up!"/>
    </form>
  )
}

export default SignUp
