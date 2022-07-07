import React from 'react'
import Reauthenticate from "../Components/Reauthenticate/reauthenticate.jsx"

const ReauthenticateModal = ({displayReauthenticateModal}) => {

  return (
    <div className="modal-container">
      <div className="modal" style={{textAlign: "center"}}>
         This is security-sensitive operation.
         <br/>
         Please reauthenticate your account by signing in
         again to complete this action.
         <br/>
         If successful, please try your
         previous action again for it to work. Thankyou!
        <Reauthenticate />
      </div>
    </div>
  )
}

export default ReauthenticateModal
