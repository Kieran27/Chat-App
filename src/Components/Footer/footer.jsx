import { Link } from "react-router-dom"
import { useUserAuth } from "../../Auth/authentication-context.js"

const Footer = () => {
  const { user } = useUserAuth()
  return (
    <footer style={{color: 'red', float:'right', display:'none'}}>
      This Is The Footer
      {user && <Link to="/chat">ChatRoom</Link>}
    </footer>
  )
}

export default Footer
