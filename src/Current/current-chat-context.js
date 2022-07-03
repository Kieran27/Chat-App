import { createContext, useState } from "react"

const ChatContext = createContext()
export function ChatProvider({ children }) {
  const [currentChat, setCurrentChat ] = useState('messages');

  const changeChatroom = (e) => {
    const text = e.target.textContent.split(" ").join("").toLowerCase();
    console.log(text)
    setCurrentChat(text)
  }

  const handleChat = (e) => {
    setCurrentChat(e.target.value)
  }

  return (
    <ChatContext.Provider value={{currentChat, changeChatroom, handleChat}}>{ children }</ChatContext.Provider>
  )
}

export default ChatContext;
