import React from 'react'
import "./modals.css"
import { useUserAuth } from "../Auth/authentication-context.js";

const DeleteAccountModal = ({displayDeleteModal, deleteAccount}) => {

  const { user } = useUserAuth();

  return (
    <div className="modal-container">
      <div className="modal">
        <p>
          <strong>WARNING</strong> proceeding with this action will delete your account
           and sign you out. All messages you have sent will still be viewable unless
          manually deleted. Continue?
        </p>
        <div className="modal-footer">
          <button onClick={displayDeleteModal}>No Thanks</button>
          <button onClick={() => deleteAccount()}>Yes, Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
