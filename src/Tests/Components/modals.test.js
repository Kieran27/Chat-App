import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom';
import { UserAuthContextProvider } from "../../Auth/authentication-context.js"
import ReauthenticateModal from "../../Modals/reauthenticate-modal.jsx"
import DeleteAccountModal from "../../Modals/delete-account-modal.jsx"

// Setup modal props
const showAuthenticate = jest.fn()

describe("Reauthenticate Modal", () => {
  it("Modal calls mock function correctly", () => {
    render(
      <UserAuthContextProvider >
      <Router>
        <ReauthenticateModal displayReauthenticateModal={showAuthenticate} />,
      </Router>
      </UserAuthContextProvider >
    )

    const closeBtn = screen.getByRole("button", {name: 'X'});
    userEvent.click(closeBtn);
    expect(showAuthenticate).toHaveBeenCalled();
    expect(showAuthenticate).toHaveBeenCalledTimes(1);
  })
})

// Setup modal props
const showDeleteModal = jest.fn()
const deleteAccount = jest.fn()

describe("Delete Account Modal", () => {

  it("Modal matches snapshot", () => {
    render(
      <UserAuthContextProvider >
      <Router>
        <DeleteAccountModal
          displayDeleteModal={showDeleteModal}
          deleteAccount={deleteAccount}
        />
      </Router>
      </UserAuthContextProvider >
    )
    expect(screen).toMatchSnapshot();
  })

  it("Modal correctly calls cancel mock function on click", () => {
    render(
      <UserAuthContextProvider >
      <Router>
        <DeleteAccountModal
          displayDeleteModal={showDeleteModal}
          deleteAccount={deleteAccount}
        />
      </Router>
      </UserAuthContextProvider >
    )
    const cancelBtn = screen.getByRole("button", {name: /no thanks/i});
    userEvent.click(cancelBtn);

    expect(showDeleteModal).toHaveBeenCalled();
    expect(showDeleteModal).toHaveBeenCalledTimes(1);
  })

  it("Modal correctly calls delete account mock function on click", () => {
    render(
      <UserAuthContextProvider >
      <Router>
        <DeleteAccountModal
          displayDeleteModal={showDeleteModal}
          deleteAccount={deleteAccount}
        />
      </Router>
      </UserAuthContextProvider >
    )
    const acceptBtn = screen.getByRole("button", {name: /yes, delete account/i});
    userEvent.click(acceptBtn);

    expect(deleteAccount).toHaveBeenCalled();
    expect(deleteAccount).toHaveBeenCalledTimes(1);
  })

})
