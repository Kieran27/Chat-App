import { useUserAuth } from "../../Auth/authentication-context.js";
import { auth } from "../../firebase-config.js"
import { useAuthState } from "react-firebase-hooks/auth"
import { Navigate } from "react-router-dom"

const RequireAuth = ({children}) => {
  const { user } = useUserAuth();
  const [users, loading, error] = useAuthState(auth)

  if (!loading && !user) {
    return (
      <Navigate to="/" replace />
    )
  }

  if (loading && user) {
    return (
      <span>Loading</span>
    )
  }

  if (user) {
    return (
      children
    )
  }

  return (
     !loading && !user ? <Navigate to="/" replace /> : children
  )
}

export default RequireAuth
