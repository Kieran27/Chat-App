import { render, screen, cleanup } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom';
import { UserAuthContextProvider } from "../../Auth/authentication-context.js"
import Homepage from "../../Routes/Homepage/homepage.jsx"

describe("Homepage Component", () => {
  afterEach(() => {
    cleanup();
  })

  it ("component renders", () => {
    render(
      <UserAuthContextProvider>
        <Router>
          <Homepage />,
        </Router>,
      </UserAuthContextProvider>
    )
    expect(screen).toMatchSnapshot();
  })

  it("login component rendered", () => {
    render(
      <UserAuthContextProvider>
        <Router>
          <Homepage />,
        </Router>,
      </UserAuthContextProvider>
    )
    const loginInput = screen.getByRole("button", { name: "Login" });
    expect(loginInput).toBeInTheDocument()
  })

  it("signup component rendered", () => {
    render(
      <UserAuthContextProvider>
        <Router>
          <Homepage />,
        </Router>,
      </UserAuthContextProvider>
    )
    const switchBtn = screen.getByRole("button", { name: "Register Here." });
    userEvent.click(switchBtn);

    const signupBtn = screen.getByRole("button", {name: "Sign Up!"});

    expect(signupBtn).toBeInTheDocument();
  })

  it("login as guest button exists", () => {
    render(
      <UserAuthContextProvider>
        <Router>
          <Homepage />,
        </Router>,
      </UserAuthContextProvider>
    )
    const loginAsGuestBtn = screen.getByRole("button", { name: /log in as guest/i });
    expect(loginAsGuestBtn).toBeInTheDocument()
  })

})
