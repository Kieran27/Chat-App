import { useState, useEffect } from "react";
import Chat from "../Chat/chat.jsx";
import ChatRoomNav from "../../Components/ChatRoom-Nav/chat-room-nav.jsx";
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import { ChatProvider } from "../../Current/current-chat-context.js"
import ChatContext from "../../Current/current-chat-context.js"
import "./chatroom-page.css";

const ChatRoomPage = () => {
  const [currentChat, setCurrentChat] = useState(null);
  
  const changeChat = (e) => {
    const text = e.target.textContent.split(" ").join("").toLowerCase();
    setCurrentChat(text);
  };

  useEffect(() => {
    console.log(currentChat);
  }, [currentChat]);

  return (
    <>
      <Header />
      <ChatProvider>
        <div className="chat-page-container">
          <ChatRoomNav changeChat={changeChat} />
          <Chat currentChat={currentChat} />
        </div>
      </ChatProvider>
      <Footer />
    </>
  );
};

export default ChatRoomPage;
