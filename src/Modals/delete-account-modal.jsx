import React from 'react'
import "./modals.css"
import { useUserAuth } from "../Auth/authentication-context.js";

const DeleteAccountModal = ({displayDeleteModal, deleteAccount}) => {

  const { user } = useUserAuth();

  return (
    <div className="modal-container">
      <div className="modal delete-account">
        <div className="modal-header">
          <h3>Warning</h3>
        </div>
        <div className="modal-body">
          <p>
            Proceeding with this action will delete your account
            and sign you out. All messages you have sent will still be viewable unless
            manually deleted. Continue?
          </p>
        </div>
        <div className="modal-footer">
          <button className='btn-cancel' onClick={displayDeleteModal}>No Thanks</button>
          <button className='btn-accept' onClick={() => deleteAccount()}>Yes, Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountModal
