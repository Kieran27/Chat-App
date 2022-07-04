import "./chat-msg-popup.css"
import { useContext } from "react"
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config.js"
import ChatContext from "../../Current/current-chat-context.js"

const ChatMsgPopup = ({ id, nimious }) => {
  const {currentChat} = useContext(ChatContext)

  const removeMessage = async (e, id) => {
      try {
        await deleteDoc(doc(db, currentChat, id));
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="chat-msg-popup">
      <div className="chat-msg-popup-item" onClick={(e) => removeMessage(e, id)}>
        Remove
      </div>
    </div>
  )
}

export default ChatMsgPopup
