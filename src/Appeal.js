import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"
import { auth } from "./firebase-config.js"
import Profile from "./Routes/profile.jsx"

const App = () => {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [username, setUserName] = useState(null)
  const [user, setUser] = useState("")
  const [loginEmail, setLoginEmail] = useState(null)
  const [loginPass, setLoginPass] = useState(null)
  const [profileStatus, setProfileStatus] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  const handleUpdateProfile = async () => {
    await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: "https://icon-library.com/images/generic-user-icon/generic-user-icon-19.jpg"
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.id === 'signup') {
      register();
    } else {
      login();
    }
  }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      handleUpdateProfile();
    } catch (error) {
      console.log(error.message)
    }
    setEmail("")
    setPassword("")
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPass)
      console.log(auth.currentUser)
    } catch (error) {
      console.log(error)
    }
    setLoginEmail("")
    setLoginPass("")
  }

  const logout = async () => {
    try {
      const user = await signOut(auth)
      console.log(auth.currentUser)
    } catch (error) {
      console.log(error)
    }
  }

  const showProfile = () => {
    setProfileStatus(profileStatus => profileStatus = !profileStatus)
  }

  return (
    <>
    <h3>signup</h3>
    <form id='signup' onSubmit={handleSubmit}>
      <label htmlFor="Email"></label>
      <input type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
      <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value) }/>
      <label htmlFor="Password"></label>
      <input type="password" placeholder="password" onChange = { (e) => setPassword(e.target.value)}/>
      <input type="submit"/>
    </form>
    <h3>login</h3>
    <form id='login' onSubmit={handleSubmit}>
      <label htmlFor="Email"></label>
      <input type="email" placeholder="email" onChange={(e) => setLoginEmail(e.target.value) }/>
      <label htmlFor="Password"></label>
      <input type="password" placeholder="password" onChange = {(e) => setLoginPass(e.target.value) }/>
      <input type="submit"/>
    </form>
    {auth.currentUser ? <button onClick={logout}>Logout</button> : ""}
      <h3>Currently Logged In As: { user?.email } </h3>
      <h4>User Display Name: { user?.displayName }</h4>
      <button onClick={showProfile}>Display User Info</button>
      {profileStatus ? < Profile /> : ""}
    </>
  );
};

export default App;
