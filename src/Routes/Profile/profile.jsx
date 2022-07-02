import { useState, useEffect } from "react"
import { auth, storage } from "../../firebase-config.js"
import { getIdToken, updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useUserAuth } from "../../Auth/authentication-context.js"
import Header from "../../Components/Header/header.jsx"
import Footer from "../../Components/Footer/footer.jsx"
import { HiPencil } from "react-icons/hi"
import "./profile.css"

const Profile = () => {

  const {user} = useUserAuth()

  const [imgFile, setImgFile] = useState(null)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [email, setEmail] = useState("")
  const [newName, setNewName] = useState("")

  const [userNameFieldset, setUserNameFieldset] = useState(true)
  const [emailFieldset, setEmailFieldset] = useState(true)
  const [passwordFieldset, setPasswordFieldset] = useState(true)

  const backgroundImg = {
    backgroundImage: `url(${user?.photoURL})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

  useEffect(() => {
    const getInfo = () => {
      console.log(user?.displayName)
    }
    getInfo()
  },[])

  useEffect(() => {
    setNewName(user?.displayName)
    setEmail(user?.email)
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imgRef = ref(storage, `${auth.currentUser.uid}.jpg`)
    try {
      const snapshot = await uploadBytes(imgRef, imgFile)
      const photoURL = await getDownloadURL(imgRef)
      await updateProfile(user, {
        photoURL: photoURL
      })
    } catch(error) {
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    setImgFile(e.target.files[0])
  }

  const handleClick = async () => {
    try {
      await user.delete()
      console.log("deleted!")
    } catch(error) {
      console.log(error)
    }
  }

  const handleDetailChange = (e) => {

  }

  const enableForm = (e) => {
    const parent = e.currentTarget.parentElement;
    console.log(parent)

    switch (parent.id) {
      case "edit-username":
      setUserNameFieldset(userNameFieldset =>  userNameFieldset = !userNameFieldset)
      break;
      case "edit-email":
      setEmailFieldset(emailFieldset => emailFieldset = !emailFieldset)
      break;
      case "edit-password":
      setPasswordFieldset(passwordFieldset => passwordFieldset = !passwordFieldset)
      break;
      default:
      return false
    }
  }

  const handleName = (e) => {
    setNewName(e.target.value)
  }

  const handleNameChange = async (e) => {
    e.preventDefault();
    await updateProfile(user, {
      displayName: newName
    })
    window.reload();
  }
  return (
    <>
    <Header />
    <div className="profile-container">
      <div className="profile-container-left">
        <h2>Profile Info</h2>

        <div className="profile-form-container" id='edit-username'>
          <button className='btn-edit' onClick={enableForm}>
            <HiPencil />
          </button>
          <form id='change-username' onSubmit={handleNameChange}>
            <fieldset disabled={userNameFieldset}>
              <div className="form-input-container">
                <label htmlFor="">Display Name</label>
                <input type="text" value={newName} onChange={handleName}/>
              </div>
              <input type="submit" value="Change Username"/>
            </fieldset>
          </form>
        </div>

        <div className="profile-form-container" id='edit-email'>
          <button className='btn-edit' onClick={enableForm}>
            <HiPencil />
          </button>
          <form id='change-email'>
            <fieldset disabled={emailFieldset}>
              <div className="form-input-container">
                <label htmlFor="">Email</label>
                <input type="email" value={email}/>
              </div>
              <input type="submit" value="Change Email"/>
            </fieldset>
          </form>
        </div>

        <div className="profile-form-container" id='edit-password'>
          <button className='btn-edit' onClick={enableForm}>
            <HiPencil />
          </button>
          <form id='change-password'>
            <fieldset disabled={passwordFieldset}>
              <div className="form-input-container">
                <label htmlFor="">Password</label>
                <input type="password" value='helloworld'/>
              </div>
              <div className="form-input-container">
                <label htmlFor="">Confirm Password</label>
                <input type="password" value={newName}/>
              </div>
              <input type="submit" value="Change Password"/>
            </fieldset>
          </form>
        </div>

        <form onSubmit={handleNameChange}>
          <label htmlFor="New Username"></label>
          <input type="text" value={newName} onChange={handleName}/>
          <input type="submit"/>
        </form>
        <button onClick={handleClick}>Delete Account</button>
      </div>
      <div className="profile-container-right">
        <div className="profile-avatar-container">
          <div style={backgroundImg} className="profile-avatar"></div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="Img-Avatar"></label>
            <input
             type="file"
             onChange={handleChange}
             accept=".jpg, .png, .gif, .svg"
            />
            <input type="submit" value="upload"/>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Profile
