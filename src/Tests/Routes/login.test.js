import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import { useUserAuth } from "../../Auth/authentication-context.js";
import { UserAuthContextProvider } from "../../Auth/authentication-context.js"

import Login from "../../Routes/Login/login.jsx"

describe("Login Component", () => {
  const { user, logIn } = useUserAuth();
  it ("component renders", () => {
    render(
      <UserAuthContextProvider>
        <Router>
          <Login />,
        </Router>,
      </UserAuthContextProvider>
    )
  })

  it("user logins with correct credential", async () => {
    const testTest = await logIn("test@email.com", "working")

    expect(user).toBeTruthy();
  })
})
