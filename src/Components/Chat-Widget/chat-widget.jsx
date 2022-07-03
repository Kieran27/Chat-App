import { useContext } from "react";
import ChatContext from "../../Current/current-chat-context.js"
import "./chat-widget.css";

const ChatWidget = ({ chat, changeChat }) => {
  const {changeChatroom} = useContext(ChatContext)
  return (
    <li key={chat.id}>
      <div onClick={changeChat} className="chat-widget">
        <div className="chat-widget-thumbnail-container"></div>
        <div className="chat-widget-info-container">
          <h5>{chat.name}</h5>
        </div>
      </div>
    </li>
  );
};

export default ChatWidget;
