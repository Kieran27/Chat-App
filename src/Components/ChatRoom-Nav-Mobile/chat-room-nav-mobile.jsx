import { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase-config.js";
import "./chat-room-nav-mobile.css";
import { HiSearch } from "react-icons/hi";
import ChatWidget from "../../Components/Chat-Widget/chat-widget.jsx";

const ChatNavMobile = ({ showNav, mobileNav }) => {
  const [chatroom, setChatroom] = useState("");
  const [chatroomCollection, setChatRoomCollection] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chatroomName = chatroom.split(" ").join("").toLowerCase();
    const chatRoomRef = collection(db, chatroomName);
    await addDoc(chatRoomRef, {
      name: "Hello There!",
    });
    await setDoc(doc(db, "chatrooms", chatroomName), {
      name: chatroom,
    });
  };

  const handleChange = (e) => {
    setChatroom(e.target.value);
  };

  useEffect(() => {
    const msgRef = collection(db, "chatrooms");
    const unsub = onSnapshot(msgRef, (snapshot) => {
      const messageData = snapshot.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
      }));
      setChatRoomCollection(messageData);
    });
    return unsub;
  }, []);

  return (
    <div
      className={
        mobileNav
          ? "chat-room-nav-mobile-container toggle-width"
          : "chat-room-nav-mobile-container"
      }
    >
      <div className="mobile-nav-header">
        <h2>Chats</h2>
        <button onClick={showNav}>X</button>
      </div>
      <div className="chat-room-nav-container-body">
        <div className="chat-room-nav-search-container">
          <HiSearch className="search-icon" />
          <input type="search" placeholder="search chatter" />
        </div>
        <nav>
          <ul>
            {chatroomCollection?.map((doc) => {
              return (
                <ChatWidget
                  key={doc.id}
                  chat={doc}
                  mobileNav={mobileNav}
                  showNav={showNav}
                />
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="chat-room-nav-container-footer">
        <form onSubmit={handleSubmit}>
          <div className="form-input-container">
            <label htmlFor="Create Chat">Create-Chat</label>
            <input
              value={chatroom}
              type="text"
              maxLength="24"
              onChange={handleChange}
              placeholder="Chat name"
              required
            />
          </div>
          <input className="btn-submit" value="Create" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ChatNavMobile;
