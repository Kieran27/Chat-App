import { useState, useEffect, useRef } from "react";
import { auth, storage } from "../../firebase-config.js";
import {
  updateProfile,
  deleteUser,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../../Auth/authentication-context.js";
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import DeleteAccountModal from "../../Modals/delete-account-modal.jsx";
import ReauthenticateModal from "../../Modals/reauthenticate-modal.jsx";
import ErrorPopup from "../../Components/Error-Popup/error-popup.jsx";
import { guestID } from "../../Utility/helper-functions.js"
import { HiPencil } from "react-icons/hi";
import { BiImageAdd } from "react-icons/bi";
import "./profile.css";

const Profile = () => {
  const { user } = useUserAuth();

  const [imgFile, setImgFile] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [photoURL, setPhotoURL] = useState("");
  const [userNameFieldset, setUserNameFieldset] = useState(true);
  const [emailFieldset, setEmailFieldset] = useState(true);
  const [passwordFieldset, setPasswordFieldset] = useState(true);

  const [imgUploading, setImgUploading] = useState(false);
  const [fieldChanging, setFieldChanging] = useState(false);
  const [emailChanging, setEmailChanging] = useState(false);
  const [passwordChanging, setPasswordChanging] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReauthenticateModal, setShowReauthenticateModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const hiddenRef = useRef(null);

  const backgroundImg = {
    backgroundImage: `url(${photoURL})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  useEffect(() => {
    setUsername(user?.displayName);
    setEmail(user?.email);
    setPhotoURL(user?.photoURL);
  }, [user]);

  useEffect(() => {
    if (errorPopup) {
      setTimeout(() => {
        setErrorPopup(false);
      }, 1250);
    }
  }, [errorPopup]);

  useEffect(() => {
    if (imgFile) {
      updateProfilePhoto();
    }
  }, [imgFile]);

  const enableForm = (e) => {
    const parent = e.currentTarget.parentElement;
    switch (parent.id) {
      case "edit-username":
        setUserNameFieldset(
          (userNameFieldset) => (userNameFieldset = !userNameFieldset)
        );
        break;
      case "edit-email":
        setEmailFieldset((emailFieldset) => (emailFieldset = !emailFieldset));
        break;
      case "edit-password":
        setPasswordFieldset(
          (passwordFieldset) => (passwordFieldset = !passwordFieldset)
        );
        break;
      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.parentElement.id;
    console.log(id);
    switch (id) {
      case "edit-username":
        handleNameChange();
        break;
      case "edit-email":
        handleEmailChange();
        break;
      case "edit-password":
        handlePasswordChange();
        break;
      default:
        return false;
    }
  };

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password-current":
        setPassword(value);
        break;
      case "password-new":
        setNewPassword(value);
        break;
      case "photo-file":
        setImgFile(e.target.files[0]);
        break;
      default:
        return false;
    }
  };

  const handleErrors = (errorCode) => {
    switch (errorCode) {
      case "auth/requires-recent-login":
        displayReauthenticateModal();
        setErrorPopup(true);
        setErrorMessage(errorCode);
        break;
      case "guest account":
        displayReauthenticateModal();
        setErrorPopup(true);
        setErrorMessage("Cannot Perform Action on Guest Account");
        setShowReauthenticateModal(false);
        break;
      default:
        displayReauthenticateModal();
        setErrorPopup(true);
        setErrorMessage("Oops Something Went Wrong");
    }
  };

  const deleteAccount = async () => {
    if (user.uid === guestID) {
      handleErrors("guest account")
    } else {
      try {
        await deleteUser(user);
      } catch (error) {
        handleErrors(error.code);
        alert(error.message);
        setShowDeleteModal(false);
      }
    }
  };

  const updateProfilePhoto = async () => {
    const imgRef = ref(storage, `${auth.currentUser.uid}${Math.random()}.jpg`);
    setImgUploading(true);
    try {
      const snapshot = await uploadBytes(imgRef, imgFile);
      const photoURL = await getDownloadURL(imgRef);
      await updateProfile(user, {
        photoURL: photoURL,
      });
      setImgUploading(false);
      window.location.reload();
    } catch (error) {
      const code = error.code;
      handleErrors(code);
    }
  };

  const handleNameChange = async () => {
    setFieldChanging(true);
    try {
      await updateProfile(user, {
        displayName: username,
      });
      setFieldChanging(false);
      window.location.reload();
      alert("Displayname Changed Successfully!");
    } catch (error) {
      const code = error.code;
      handleErrors(code);
    }
  };

  const handleEmailChange = async () => {
    if (user.uid === guestID) {
      handleErrors("guest account")
    } else {
      try {
        setEmailChanging(true)
        await updateEmail(user, email);
        setEmailChanging(false);
        alert("Email Changed Successfully!");
        window.location.reload();
      } catch (error) {
        const code = error.code;
        handleErrors(code);
        setEmailChanging(false)
      }
    }
  };

  const handlePasswordChange = async (e) => {
    if (password !== newPassword) {
      setErrorMessage("Passwords Must Match!");
      setErrorPopup(true);
    } else if (user.uid === guestID) {
      handleErrors("guest account")
    } else {
      try {
        setPasswordChanging(true)
        await updatePassword(user, password);
        setPasswordChanging(false);
        alert("Password Changed Successfully!");
        window.location.reload();
      } catch (error) {
        const code = error.code;
        setPasswordChanging(false)
        handleErrors(code);
      }
    }
  };

  const simulatePhotoChange = async (e) => {
    await hiddenRef.current.click();
  };

  const displayDeleteModal = () => {
    setShowDeleteModal(
      (showDeleteModal) => (showDeleteModal = !showDeleteModal)
    );
  };

  const displayReauthenticateModal = () => {
    setShowReauthenticateModal(
      (showReauthenticateModal) =>
        (showReauthenticateModal = !showReauthenticateModal)
    );
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        {showDeleteModal && (
          <DeleteAccountModal
            displayDeleteModal={displayDeleteModal}
            deleteAccount={deleteAccount}
          />
        )}
        {showReauthenticateModal && (
          <ReauthenticateModal
            displayReauthenticateModal={displayReauthenticateModal}
          />
        )}
        {errorPopup && <ErrorPopup message={errorMessage} />}
        <div className="profile-container-left">
          <h2>Profile Info</h2>
          <div className="profile-form-container" id="edit-username">
            <button className="btn-edit" onClick={enableForm}>
              <HiPencil />
            </button>
            <form id="change-username" onSubmit={handleSubmit}>
              <fieldset disabled={userNameFieldset}>
                <div className="form-input-container">
                  <label htmlFor="">Display Name</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={handleChange}
                    maxLength="20"
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btn-field-submit"
                  value={
                    fieldChanging
                      ? "Changing Displayname..."
                      : "Change Displayname"
                  }
                />
              </fieldset>
            </form>
          </div>

          <div className="profile-form-container" id="edit-email">
            <button className="btn-edit" onClick={enableForm}>
              <HiPencil />
            </button>
            <form id="change-email" onSubmit={handleSubmit}>
              <fieldset disabled={emailFieldset}>
                <div className="form-input-container">
                  <label htmlFor="">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    maxLength="24"
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btn-field-submit"
                  value={emailChanging ? "Changing Email..." : "Change Email"}
                />
              </fieldset>
            </form>
          </div>

          <div className="profile-form-container" id="edit-password">
            <button className="btn-edit" onClick={enableForm}>
              <HiPencil />
            </button>
            <form id="change-password" onSubmit={handleSubmit}>
              <fieldset disabled={passwordFieldset}>
                <div className="form-input-container">
                  <label htmlFor="">New Password</label>
                  <input
                    id="password-current"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    maxLength="24"
                    required
                  />
                </div>
                <div className="form-input-container">
                  <label htmlFor="">Confirm New Password</label>
                  <input
                    id="password-new"
                    type="password"
                    value={newPassword}
                    onChange={handleChange}
                    maxLength="24"
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btn-field-submit"
                  value={
                    passwordChanging
                      ? "Changing Password..."
                      : "Change Password"
                  }
                />
              </fieldset>
            </form>
          </div>

          <button onClick={displayDeleteModal}>Delete Account</button>
        </div>
        <div className="profile-container-right">
          <div className="profile-avatar-container">
            <div style={backgroundImg} className="profile-avatar"></div>
            <h3 className="user-display-name">{user?.displayName}</h3>
            <button className="file-input-btn" onClick={simulatePhotoChange}>
              <BiImageAdd />
              {imgUploading ? "Changing..." : "Change"}
            </button>
            <input
              style={{ display: "none" }}
              id="photo-file"
              name="Img-Avatar"
              className="file"
              type="file"
              ref={hiddenRef}
              onChange={handleChange}
              accept=".jpg, .png, .gif, .svg"
              required
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
