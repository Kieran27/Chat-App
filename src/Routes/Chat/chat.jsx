import { useState, useEffect } from 'react'
import ChatInput from "../../Components/Chat-Input/chat-input.jsx"
import ChatMessage from "../../Components/Chat-Message/chat-message.jsx"
import { db } from "../../firebase-config.js"
import { collection, getDocs, onSnapshot } from "firebase/firestore"

const Chat = () => {
  const [ messages, setMessages ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const msgRef = collection(db, 'messages')
    const unsub = onSnapshot(msgRef, (snapshot) => {
      const messageData = (snapshot.docs.map((docs) => ({...docs.data(), id: docs.id})))
      setMessages(messageData.sort((a, b) => (a.timestamp.seconds > b.timestamp.seconds)
        ? 1
        : -1
      ))
      setLoading(false)
    })
    return unsub
  }, [])

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getDocs(msgRef)
  //     setMessages(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  //   }
  //   getData()
  // }, [])

  return (
    <>
    {loading && <p>Loading</p>}
    <div>This Is The ChatRoom</div>
    {messages?.map((msg) => {
      return <ChatMessage key={msg.id} message={msg} />
    })}
    <ChatInput />
    </>
  )
}

export default Chat
