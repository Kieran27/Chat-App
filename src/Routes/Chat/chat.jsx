import { useState, useEffect } from 'react'
import ChatInput from "../../Components/Chat-Input/chat-input.jsx"
import ChatMessage from "../../Components/Chat-Message/chat-message.jsx"
import ChatRoomNav from "../../Components/ChatRoom-Nav/chat-room-nav.jsx"
import { db } from "../../firebase-config.js"
import "./chat.css"
import { collection, getDocs, onSnapshot, limit, orderBy, query } from "firebase/firestore"

const Chat = ({currentChat}) => {
  const [ messages, setMessages ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const msgRef = !currentChat ? collection(db, 'messages') : collection(db, currentChat)
    const msgQuery = query(msgRef, orderBy("timestamp"), limit(25))
    const unsub = onSnapshot(msgQuery, (snapshot) => {
      const messageData = (snapshot.docs.map((docs) => ({...docs.data(), id: docs.id})))
      setMessages(messageData)
      setLoading(false)
    })
    return unsub
  }, [currentChat])

  return (
    <div className="chat-room-container">
      <div className="chat-room-container-body">
        {loading && <p>Loading</p>}
        <h2>Chat Room {currentChat}</h2>
          {messages?.map((msg) => {
            return <ChatMessage key={msg.id} message={msg} />
          })}
      </div>
        <div className="chat-room-container-footer">
          <ChatInput currentChat={currentChat} />
        </div>
    </div>
  )
}

export default Chat
