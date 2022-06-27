import { Link } from "react-router-dom"
import { useUserAuth } from "../../Auth/authentication-context.js"

const Footer = () => {
  const { user } = useUserAuth()
  return (
    <footer>
      This Is The Footer
      {user && <Link to="/chat">ChatRoom</Link>}
    </footer>
  )
}

export default Footer
