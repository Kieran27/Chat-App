import { useState } from "react";
import Chat from "../Chat/chat.jsx";
import ChatRoomNav from "../../Components/ChatRoom-Nav/chat-room-nav.jsx";
import Header from "../../Components/Header/header.jsx";
import Footer from "../../Components/Footer/footer.jsx";
import { ChatProvider } from "../../Current/current-chat-context.js";
import ChatNavMobile from "../../Components/ChatRoom-Nav-Mobile/chat-room-nav-mobile.jsx";
import "./chatroom-page.css";

const ChatRoomPage = () => {
  const [mobileNav, setMobileNav] = useState(false);

  const displayMobileNav = () => {
    setMobileNav((mobileNav) => (mobileNav = !mobileNav));
    console.log("hello!");
  };
  return (
    <>
      <Header />
      <ChatProvider>
        <div className="chat-page-container">
          <ChatRoomNav />
          <Chat showNav={displayMobileNav} />
          {mobileNav && <ChatNavMobile showNav={displayMobileNav} mobileNav />}
        </div>
      </ChatProvider>
      <Footer />
    </>
  );
};

export default ChatRoomPage;
