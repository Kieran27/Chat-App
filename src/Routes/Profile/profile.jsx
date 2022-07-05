import { useState, useEffect } from "react";
import { auth, storage } from "../../firebase-config.js";
import { getIdToken, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useUserAuth } from "../../Auth/authentication-context.js";
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import { HiPencil } from "react-icons/hi";
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

  const [imgUploading, setImgUploading] = useState(false)

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

  const enableForm = (e) => {
    const parent = e.currentTarget.parentElement;
    switch (parent.id) {
      case "edit-username":
        setUserNameFieldset(
          (userNameFieldset) => (userNameFieldset = !userNameFieldset)
        );
        break;
      case "edit-email":
        setEmailFieldset(
          (emailFieldset) => (emailFieldset = !emailFieldset)
        );
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
    console.log(e.target);
    switch (id) {
      case "edit-username":
        handleNameChange();
        break;
      case "edit-email":
        // code
        break;
      case "edit-password":
        // Code
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

  const handlePhotoChange = (e) => {
    e.preventDefault();
    updateProfilePhoto();
  }

  const handleClick = async () => {
    try {
      await user.delete();
      console.log("deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfilePhoto = async () => {
    const imgRef = ref(storage, `${auth.currentUser.uid}${Math.random()}.jpg`);
    setImgUploading(true)
    try {
      const snapshot = await uploadBytes(imgRef, imgFile);
      const photoURL = await getDownloadURL(imgRef);
      await updateProfile(user, {
        photoURL: photoURL,
      });
      console.log("success!");
      setImgUploading(false)
      window.location.reload()
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNameChange = async () => {
    try {
      await updateProfile(user, {
        displayName: username,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEmailChange = () => {};

  const handlePasswordChange = () => {};

  return (
    <>
      <Header />
      <div className="profile-container">
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
                    maxLength='20'
                    required
                  />
                </div>
                <input type="submit" value="Change Username" />
              </fieldset>
            </form>
          </div>

          <div className="profile-form-container" id="edit-email">
            <button className="btn-edit" onClick={enableForm}>
              <HiPencil />
            </button>
            <form id="change-email">
              <fieldset disabled={emailFieldset}>
                <div className="form-input-container">
                  <label htmlFor="">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    maxLength='24'
                    required
                  />
                </div>
                <input type="submit" value="Change Email" />
              </fieldset>
            </form>
          </div>

          <div className="profile-form-container" id="edit-password">
            <button className="btn-edit" onClick={enableForm}>
              <HiPencil />
            </button>
            <form id="change-password">
              <fieldset disabled={passwordFieldset}>
                <div className="form-input-container">
                  <label htmlFor="">New Password</label>
                  <input
                    id="password-current"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    maxLength='24'
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
                    maxLength='24'
                    required
                  />
                </div>
                <input type="submit" value="Change Password" />
              </fieldset>
            </form>
          </div>

          <button onClick={handleClick}>Delete Account</button>
        </div>
        <div className="profile-container-right">
          <div className="profile-avatar-container">
            <div style={backgroundImg} className="profile-avatar"></div>
            <h3 className="user-display-name">{user?.displayName}</h3>
            <form id="edit-photoURL" onSubmit={handlePhotoChange}>
                <label htmlFor="Img-Avatar"></label>
                <input
                  id="photo-file"
                  type="file"
                  onChange={handleChange}
                  accept=".jpg, .png, .gif, .svg"
                  required
                />
              <input
                type="submit"
                value={imgUploading
                ? "uploading..."
                : "upload"}
              />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
