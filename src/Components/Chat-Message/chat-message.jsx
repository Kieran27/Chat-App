import React from 'react'
import "./chat-message.css"
import { useUserAuth } from "../../Auth/authentication-context.js"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase-config.js"

const ChatMessage = ({message}) => {

  const handleClick = async (id) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      console.log('hello!')
    } catch (error) {
      console.log(error)
    }
  }

  const { user } = useUserAuth()
  return (
    <div className={user.uid === message.userId
      ? "chat-message chat-message-user"
      : "chat-message"}
    >
      <p>{message.message}</p>
      {user.uid === message.userId
        ? <button onClick={() => handleClick(message.id)}>&times;</button>
        : ''
      }
    </div>
  )
}


export default ChatMessage
