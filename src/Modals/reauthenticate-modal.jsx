import React from 'react'
import Reauthenticate from "../Components/Reauthenticate/reauthenticate.jsx"

const ReauthenticateModal = ({displayReauthenticateModal}) => {

  return (
    <div className="modal-container">
      <div className="modal modal-authenticate" style={{textAlign: "center"}}>
        <div className="modal-header">
          <button onClick={displayReauthenticateModal}>X</button>
        </div>
        <p>
          This is <strong>security-sensitive</strong> operation.
          <br/>
          Please <strong>reauthenticate</strong> your account by signing in
          again to complete this action.
          <br/>
          If successful, please try your previous action again for it to
          work. Thankyou!
        </p>
        <Reauthenticate />
      </div>
    </div>
  )
}

export default ReauthenticateModal
