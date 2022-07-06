import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./Auth/authentication-context.js"
import HomePage from "./Routes/Homepage/homepage.jsx"
import Profile from "./Routes/Profile/profile.jsx"
import SignUp from "./Routes/Sign-Up/sign-up.jsx"
import Login from "./Routes/Login/login.jsx"
import ChatRoomPage from "./Routes/Chatroom-Page/chatroom-page.jsx"
import ChatNavMobile from "./Routes/Chat-Nav-Mobile/chat-nav-mobile.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/chat" element={<ChatRoomPage />} />
              <Route path="/chat-nav" element={<ChatNavMobile />} />
            </Routes>
        </main>
      </UserAuthContextProvider>
  </BrowserRouter>
  )
}

export default App
