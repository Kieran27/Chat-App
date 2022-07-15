import { render, screen } from '@testing-library/react';
import { useUserAuth } from "../../Auth/authentication-context.js";
import { ChatProvider } from "../../Current/current-chat-context.js";
import { UserAuthContextProvider } from "../../Auth/authentication-context.js"
import ChatMessage from "../../Components/Chat-Message/chat-message.jsx"

// Setup message prop
const chatMessage = {
  id: "uniqueId",
  message: "Hello World",
  owner: "foo",
}

describe("Chat-Message Component", () => {
  const { user, logIn, logOut } = useUserAuth();

  it("chat message displays correct message info", () => {
    render(
      <UserAuthContextProvider>
        <ChatProvider>
          <ChatMessage message={chatMessage} />,
        </ChatProvider>
      </UserAuthContextProvider>
    )
    const messageContent = screen.getByTextContent("Hello World");
    expect(messageContent).toBeInTheDocument()
  })
})
