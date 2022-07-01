import {useState} from 'react'
import { db } from "../../firebase-config.js"
import { addDoc, collection, Timestamp } from "firebase/firestore"
import { useUserAuth } from "../../Auth/authentication-context.js"
import "./chat-input.css"

const ChatInput = ({currentChat, scrollIntoView}) => {
  const [msg, setMsg] = useState("");
  const msgRef = !currentChat ? collection(db, 'messages') : collection(db, currentChat)
  const { user } = useUserAuth()

  const handleChange = (e) => {
    setMsg(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addMsg()
    clearInput()
  }

  const clearInput = () => {
    setMsg("")
  }

  const addMsg = async () => {
    await addDoc(msgRef, {
      message: msg,
      timestamp: Timestamp.now(),
      userId: user.uid
    })
    scrollIntoView()
  }

  return (
    <form className='chat-input' onSubmit={handleSubmit}>
      <input
        type="text"
        name="msg-box"
        id="msg-box"
        cols="50"
        rows="5"
        placeholder="Say something nice..."
        onChange={handleChange}
        value={msg}
        autoComplete="off"
        required
      />
      <input
        type="submit"
        value="send"
      />
    </form>
  )
}

export default ChatInput
