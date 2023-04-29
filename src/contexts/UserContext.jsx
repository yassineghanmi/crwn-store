import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/Firebase.utils";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//userReducer
const userReducer = (state, action) => {
 // console.log("dispatched");
 // console.log("action = ", action);
  const { type, payload } = action;
  switch (type) {
    case "SET_CURRENT_USER":
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  const INITIAL_STATE = { currentUser: null };
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
 // console.log("current user = ", currentUser);
  //userAction
  const setCurrentUser = (user) => {
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
