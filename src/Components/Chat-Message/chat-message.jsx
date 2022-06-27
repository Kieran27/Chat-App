import React from 'react'
import "./chat-message.css"
import { useUserAuth } from "../../Auth/authentication-context.js"

const ChatMessage = ({message}) => {

  const { user } = useUserAuth()
  return (
    <div>
      <p>{message.message}</p>
      <p>{user.displayName}</p>
    </div>
  )
}


export default ChatMessage
