import { useState, useEffect } from "react";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase-config.js";
import "./chat-room-nav.css";
import { HiSearch } from "react-icons/hi";
import ChatWidget from "../../Components/Chat-Widget/chat-widget.jsx";

const ChatRoomNav = () => {
  const [backupChatroom, setBackupChatroom] = useState(null);
  const [chatroom, setChatroom] = useState("");
  const [chatroomCollection, setChatRoomCollection] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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

  const handleSearch = (e) => {
    const filteredValue = e.target.value.toLowerCase();
    setSearchValue(filteredValue);
  }

  useEffect(() => {
    const msgRef = collection(db, "chatrooms");
    const unsub = onSnapshot(msgRef, (snapshot) => {
      const messageData = snapshot.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
      }));
      setChatRoomCollection(messageData);
      setBackupChatroom(messageData);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const filterSearch = () => {
      const filteredResults = backupChatroom?.filter((item) => {
        if (searchValue === "" ) {
          return backupChatroom
        } else {
          return item.id.includes(searchValue)
        }
      })
      setChatRoomCollection(filteredResults)
    }
    filterSearch()
  }, [searchValue])

  return (
    <aside className="chat-room-nav-container">
      <h2>Chats</h2>
      <div className="chat-room-nav-container-body">
        <div className="chat-room-nav-search-container">
          <HiSearch className="search-icon" />
          <input
            type="search"
            placeholder="search chatter"
            value={searchValue}
            onChange={handleSearch}
          />
        </div>
        <nav>
          <ul>
            {chatroomCollection?.map((doc) => {
              return <ChatWidget key={doc.id} chat={doc} />;
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
    </aside>
  );
};

export default ChatRoomNav;
