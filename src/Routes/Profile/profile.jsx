import { useState, useEffect } from "react"
import { auth, storage } from "../../firebase-config.js"
import { getIdToken, updateProfile } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useUserAuth } from "../../Auth/authentication-context.js"

const Profile = () => {

  const [imgFile, setImgFile] = useState(null)
  const [newName, setNewName] = useState("")

  const {user} = useUserAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const imgRef = ref(storage, `${auth.currentUser.uid}.jpg`)
    try {
      const snapshot = await uploadBytes(imgRef, imgFile)
      const photoURL = await getDownloadURL(imgRef)
      await updateProfile(user, {
        photoURL: photoURL
      })
      console.log('Uploaded!')
      console.log(imgFile)
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Img-Avatar"></label>
        <input type="file" onChange={handleChange}/>
        <input type="submit" value="upload"/>
      </form>
      <form onSubmit={handleNameChange}>
        <label htmlFor="New Username"></label>
        <input type="text" value={newName} onChange={handleName}/>
        <input type="submit"/>
      </form>
      <h3>{user?.displayName}</h3>
      <h3>{user?.email}</h3>
      <img style={{
        width: '50px'
      }} src={user?.photoURL} alt=""/>
      <button onClick={handleClick}>Delete Account</button>
    </div>
  )
}

export default Profile
