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
    <div style={{
      display: "flex",
      width: "200px",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <p>{message.message}</p>
      {user.uid === message.userId
        ? <button onClick={() => handleClick(message.id)}>&times;</button>
        : ''
      }
    </div>
  )
}


export default ChatMessage
