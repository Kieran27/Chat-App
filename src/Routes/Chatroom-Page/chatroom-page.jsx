import Chat from "../Chat/chat.jsx";
import ChatRoomNav from "../../Components/ChatRoom-Nav/chat-room-nav.jsx";
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import { ChatProvider } from "../../Current/current-chat-context.js"
import "./chatroom-page.css";

const ChatRoomPage = () => {
  return (
    <>
      <Header />
      <ChatProvider>
        <div className="chat-page-container">
          <ChatRoomNav />
          <Chat />
        </div>
      </ChatProvider>
      <Footer />
    </>
  );
};

export default ChatRoomPage;
