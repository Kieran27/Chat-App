import { useState, useEffect } from "react"
import { auth, storage } from "../../firebase-config.js"
import { getIdToken, updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useUserAuth } from "../../Auth/authentication-context.js"
import Header from "../../Components/Header/header.jsx"
import Footer from "../../Components/Footer/footer.jsx"
import "./profile.css"

const Profile = () => {

  const {user} = useUserAuth()

  const [imgFile, setImgFile] = useState(null)
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [email, setEmail] = useState(user ? user.email : 'none')
  const [newName, setNewName] = useState(user ? user.displayName : 'none')

  const backgroundImg = {
    backgroundImage: `url(${user?.photoURL})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  }

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
        <form id='change-details'>
          <fieldset disabled>
            <div className="form-input-container">
              <label htmlFor="">Display Name</label>
              <input type="text" value={newName}/>
            </div>
            <div className="form-input-container">
              <label htmlFor="">Email</label>
              <input type="email" value={newName}/>
            </div>
            <div className="form-input-container">
              <label htmlFor="">Password</label>
              <input type="password" value='helloworld'/>
            </div>
            <div className="form-input-container">
              <label htmlFor="">Confirm Password</label>
              <input type="password" value={newName}/>
            </div>
            <input type="submit" value="Change Details"/>
          </fieldset>
        </form>

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
