import { useState, useEffect } from "react"
import { collection, doc, addDoc, setDoc, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase-config.js"
import "./chat-room-nav.css"

const ChatRoomNav = ({changeChat}) => {

  const [chatroom, setChatroom] = useState('')
  const [chatroomCollection, setChatRoomCollection] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const chatroomName = chatroom.split(' ').join('').toLowerCase()
    const chatRoomRef = collection(db, chatroomName);
    await addDoc((chatRoomRef), {
      name: 'Hello There!'
    })
    await setDoc(doc(db, 'chatrooms', chatroomName ), {
    name: chatroom,
  });
  }

  const handleChange = (e) => {
    setChatroom(e.target.value)
  }

  useEffect(() => {
    const msgRef = collection(db, 'chatrooms')
    const unsub = onSnapshot(msgRef, (snapshot) => {
      const messageData = (snapshot.docs.map((docs) => ({...docs.data(), id: docs.id})))
      setChatRoomCollection(messageData)
    })
    return unsub
  }, [])

  return (
    <aside className="chat-room-nav-container">
      <div className="chat-room-nav-container-body">
        <nav>
          <ul>
            {chatroomCollection?.map((doc) => {
              return (
                <li key={doc.id}>
                  <button onClick={changeChat} style={{marginBottom: '1rem'}}>
                    {doc.name}
                  </button>
                </li>
              )
            }
          )}
          </ul>
        </nav>
      </div>
      <div className="chat-room-nav-container-footer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="Create Chat">Create-Chat</label>
          <input value={chatroom} type="text" onChange={handleChange}/>
          <input type="submit"/>
        </form>
      </div>
    </aside>
  )
}

export default ChatRoomNav
