import { Link, useNavigate } from "react-router-dom"
import { useUserAuth } from "../../Auth/authentication-context.js"
import "./header.css"

const Header = () => {
  const navigate = useNavigate()
  const { signUp, user, logOut } = useUserAuth();

  const signOut = async () => {
    await logOut()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <h1 style={{margin: '0'}}>Chatter</h1>
        </Link>
      </div>
      <div className="header-right">
        {user ? <button onClick={signOut}>Logout</button> : ''}
        {user ? <Link to='/profile'>Profile</Link> : ''}
      </div>
    </header>
  )
}

export default Header
