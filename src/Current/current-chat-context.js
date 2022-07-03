import { createContext, useState } from "react"

const ChatContext = createContext()
export function ChatProvider({ children }) {
  const [currentChat, setCurrentChat ] = useState('messages');

  const changeChatroom = (e) => {
    const text = e.target.textContent.split(" ").join("").toLowerCase();
    console.log(text)
    setCurrentChat(text)
  }

  return (
    <ChatContext.Provider value={{currentChat, changeChatroom}}>{ children }</ChatContext.Provider>
  )
}

export default ChatContext;
