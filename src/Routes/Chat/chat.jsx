import { useState, useEffect, useRef, useContext } from "react";
import ChatInput from "../../Components/Chat-Input/chat-input.jsx";
import ChatMessage from "../../Components/Chat-Message/chat-message.jsx";
import ChatContext from "../../Current/current-chat-context.js"
import { db } from "../../firebase-config.js";
import "./chat.css";
import {
  collection,
  getDocs,
  onSnapshot,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

const Chat = ({showNav}) => {
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const dummyRef = useRef(null);
  const {currentChat} = useContext(ChatContext)

  useEffect(() => {
    const msgRef = !currentChat
      ? collection(db, "messages")
      : collection(db, currentChat);
    const msgQuery = query(msgRef, orderBy("timestamp", "desc"), limit(25));
    const unsub = onSnapshot(msgQuery, (snapshot) => {
      const messageData = snapshot.docs.map((docs) => ({
        ...docs.data(),
        id: docs.id,
      }));
      setMessages(
        messageData.sort((a, b) =>
          a.timestamp.seconds > b.timestamp.seconds ? 1 : -1
        )
      );
      setLoading(false);
    });
    return unsub;
  }, [currentChat]);

  const scrollIntoView = () => {
    dummyRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollIntoView();
  },[messages])

  return (
    <div className="chat-room-container">
      <div className="chat-room-body-header">
        <h2>Chat Room: {currentChat}</h2>
        <button onClick={showNav}>X</button>
      </div>
      <div className="chat-room-container-body">
        {loading && <p>Loading</p>}
        {messages?.map((msg) => {
          return <ChatMessage key={msg.id} message={msg} />;
        })}
        <div ref={dummyRef}></div>
      </div>
      <div className="chat-room-container-footer">
        <ChatInput scrollIntoView={scrollIntoView} />
      </div>
    </div>
  );
};

export default Chat;
