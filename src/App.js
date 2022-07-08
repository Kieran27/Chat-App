import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./Auth/authentication-context.js"
import HomePage from "./Routes/Homepage/homepage.jsx"
import Profile from "./Routes/Profile/profile.jsx"
import SignUp from "./Routes/Sign-Up/sign-up.jsx"
import Login from "./Routes/Login/login.jsx"
import ChatRoomPage from "./Routes/Chatroom-Page/chatroom-page.jsx"
import RequireAuth from "./Routes/RequireAuth/require-auth.jsx"

const App = () => {
  return (
    <HashRouter>
      <UserAuthContextProvider>
        <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                  <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/chat"
                element={
                  <RequireAuth>
                  <ChatRoomPage />
                  </RequireAuth>
                }
              />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </main>
      </UserAuthContextProvider>
  </HashRouter>
  )
}

export default App
