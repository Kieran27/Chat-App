import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./Auth/authentication-context.js"
import HomePage from "./Routes/Homepage/homepage.jsx"
import Profile from "./Routes/Profile/profile.jsx"
import SignUp from "./Routes/Sign-Up/sign-up.jsx"
import Login from "./Routes/Login/login.jsx"
import Chat from "./Routes/Chat/chat.jsx"
import Header from "./Components/Header/header.jsx"
import Footer from "./Components/Footer/footer.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
        <Footer />
      </UserAuthContextProvider>
  </BrowserRouter>
  )
}

export default App
