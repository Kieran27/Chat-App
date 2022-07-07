import {
   createContext,
   useContext,
   useEffect,
   useState
 } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  reauthenticateWithCredential
} from "firebase/auth"
import { auth } from "../firebase-config.js"

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {

  const [user, setUser] = useState(null)

  function signUp (email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logOut() {
    return signOut(auth)
  }

  function reAuthenticate(email, password) {
    return reauthenticateWithCredential(
        user.email,
        password
    )
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe();
  }, [])


  return <userAuthContext.Provider value={{user, signUp, logIn, logOut, reAuthenticate}}> {children} </userAuthContext.Provider>
}

export function useUserAuth() {
  return useContext(userAuthContext)
}
