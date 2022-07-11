import { useUserAuth } from "../../Auth/authentication-context.js";
import { useNavigate } from "react-router-dom";
import "./sign-in-test.css"

const SigninAsTest = () => {
  const { logIn } = useUserAuth()
  const navigate = useNavigate();

  const loginAsGuest = async () => {
    try {
      await logIn("guest@email.com", "password123")
      navigate("/chat");
    } catch(error) {
      alert(error.code)
    }
  }

  return (
    <button className="btn-login-as-guest" onClick={loginAsGuest}>
      Log In As Guest
    </button>
  )
}

export default SigninAsTest
