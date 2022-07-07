import React from 'react'
import { useUserAuth } from "../../Auth/authentication-context.js";
import { Navigate } from "react-router-dom"

const RequireAuth = ({children}) => {
  const { user } = useUserAuth();

  return (
    !user ? <Navigate to="/" replace /> : children
  )
}

export default RequireAuth
