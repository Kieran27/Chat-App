import "./chat-msg-popup.css"
import { useContext } from "react"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config.js"
import ChatContext from "../../Current/current-chat-context.js"

const ChatMsgPopup = ({id}) => {
  const {currentChat, changeChatroom, handleChat} = useContext(ChatContext)

  const removeMessage = async(id) => {
    const chatRef = currentChat.split(' ').join('').toLowerCase()
    try {
      await deleteDoc(doc(db, chatRef, id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chat-msg-popup">
      <div className="chat-msg-popup-item" onClick={removeMessage}>
        Remove
      </div>
    </div>
  )
}

export default ChatMsgPopup
