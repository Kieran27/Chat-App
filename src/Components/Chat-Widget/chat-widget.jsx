import { useContext } from "react";
import ChatContext from "../../Current/current-chat-context.js";
import ChatWidgetImg from "../../Assets/Images/chat-widget-img.png"
import "./chat-widget.css";

const ChatWidget = ({ chat, mobileNav, showNav }) => {
  const { currentChat, changeChatroom } = useContext(ChatContext);

  const switchChatroom = (e) => {
    if (mobileNav) {
      showNav();
    }
    changeChatroom(e);
  };

  return (
    <li key={chat.id}>
      <div
        onClick={switchChatroom}
        className={
          currentChat === chat.name.toLowerCase()
            ? "chat-widget active-chat"
            : "chat-widget"
        }
      >
        <div className="chat-widget-thumbnail-container"></div>
        <div className="chat-widget-info-container">
          <h5>{chat.name}</h5>
        </div>
      </div>
    </li>
  );
};

export default ChatWidget;
