// src/context/AppReducer.js

// Reducer function that handles updates to the global state based on dispatched actions.
export const AppContextReducer = (state, action) => {
  // The 'switch' statement handles different types of actions that can modify the global state.
  switch (action.type) {
    // Handles setting the 'user' property in the global state.
    // The payload contains the new user data which will replace the current 'user' state.
    case "SET_USER":
      return {
        ...state, // Keeps the existing state properties unchanged.
        user: action.payload, // Updates only the 'user' property with the new value.
      };

    // Handles modifying the 'editNoteState' in the global state.
    // The payload contains the new value for the 'editNoteState' which could control UI state for editing notes.
    case "EDIT_NOTE_STATE":
      return {
        ...state, // Keeps the existing state properties unchanged.
        editNoteState: action.payload, // Updates only the 'editNoteState' property with the new value.
      };

    // Default case to return the current state if no matching action type is found.
    default:
      return state; // Ensures the state remains unchanged when the action type is unrecognized.
  }
};
