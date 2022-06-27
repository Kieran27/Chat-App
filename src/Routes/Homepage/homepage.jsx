import React from 'react'
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <>
    <Link to="/register">
      SignUp
    </Link>
    <Link to="/login">
      Login
    </Link>
    </>
  )
}

export default HomePage
