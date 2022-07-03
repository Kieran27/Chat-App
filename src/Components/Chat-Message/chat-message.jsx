import { useState, useContext } from "react";
import "./chat-message.css";
import { useUserAuth } from "../../Auth/authentication-context.js";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config.js";
import { HiOutlineDotsVertical } from "react-icons/hi"
import ChatMsgPopup from "../../Components/Chat-Msg-Popup/chat-msg-popup.jsx"
import ChatContext from "../../Current/current-chat-context.js"

const ChatMessage = ({ message }) => {
  const [showPopup, setShowPopup] = useState(false)
  const {currentChat} = useContext(ChatContext)
  const { user } = useUserAuth();

  const handleClick = async (id) => {
    try {
      await deleteDoc(doc(db, currentChat, id));
      console.log("hello!");
    } catch (error) {
      console.log(error);
    }
  };

  const setPopupStatus = (e) => {
      setShowPopup(showPopup => showPopup = !showPopup)
  }


  return (
    <div
      className={
        user.uid === message.userId
          ? "chat-message chat-message-user"
          : "chat-message"
      }
    >
      {user.uid === message.userId ? (
        <button className='msg-edit-btn' onClick={setPopupStatus}>
          <HiOutlineDotsVertical />
          {showPopup && <ChatMsgPopup id={message.id} />}
        </button>
      ) : (
        ""
      )}
      <p>{message.message}</p>
    </div>
  );
};

export default ChatMessage;
