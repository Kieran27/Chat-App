import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from "../firebase-config.js"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe();
  }, [])


  return <userAuthContext.Provider value={{user, signUp, logIn, logOut}}> {children} </userAuthContext.Provider>
}

export function useUserAuth() {
  return useContext(userAuthContext)
}