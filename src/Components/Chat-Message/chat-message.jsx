import { useState } from "react";
import "./chat-message.css";
import { useUserAuth } from "../../Auth/authentication-context.js";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config.js";
import { HiOutlineDotsVertical } from "react-icons/hi"
import ChatMsgPopup from "../../Components/Chat-Msg-Popup/chat-msg-popup.jsx"

const ChatMessage = ({ message }) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleClick = async (id) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      console.log("hello!");
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useUserAuth();
  return (
    <div
      className={
        user.uid === message.userId
          ? "chat-message chat-message-user"
          : "chat-message"
      }
    >
      {user.uid === message.userId ? (
        <button className='msg-edit-btn' onClick={() => setShowPopup(showPopup => showPopup = !showPopup)}>
          <HiOutlineDotsVertical />
          {showPopup && <ChatMsgPopup id={message.userId} />}
        </button>
      ) : (
        ""
      )}
      <p>{message.message}</p>
    </div>
  );
};

export default ChatMessage;
