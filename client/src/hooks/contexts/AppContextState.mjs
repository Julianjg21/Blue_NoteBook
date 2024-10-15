// src/context/AppContext.js
import React, { createContext, useReducer } from "react";
import { AppContextReducer } from "./AppContextStateReducer.mjs";

//global initial state
const initialState = {
  addNote: "",
  /*render note edit ¨*/
  editNoteState: {
    editState: true,
    editTitle: "",
    editDescription: "",
    id: 0,
    editNoteFromHome: false,
  },
};

//Create the context
export const AppContextState = createContext(initialState);

//Create the provider
export const AppContextStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppContextReducer, initialState);

  return (
    <AppContextState.Provider value={{ state, dispatch }}>
      {children}
    </AppContextState.Provider>
  );
};
