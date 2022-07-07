import React from 'react'
import Login from "../Routes/Login/login.jsx"

const ReauthenticateModal = () => {
  return (
    <div className="modal-container">
      <div className="modal">
        Whoops, it looks like you've tried to change sensitive information. This is a security risk.
         Please reauthenticate your account by logging in again. If successful, please try your
         previous action again for it to work. Thankyou!
        <Login />
      </div>
    </div>
  )
}

export default ReauthenticateModal
