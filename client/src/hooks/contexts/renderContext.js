// src/contexts/RenderContext.js

import React, { createContext, useState } from "react";

// Create a context for managing component rendering.
const RenderContext = createContext();

// Provider component that wraps the application and provides the render context.
const RenderProvider = ({ children }) => {
  // State to keep track of the current component to render.
  const [component, setComponent] = useState("AuthContainer");

  // Function to update the component state based on the parameter received.
  const renderComponent = (param) => {
    switch (param) {
      // Sets the current component to 'AuthContainer' when requested.
      case "AuthContainer":
        setComponent("AuthContainer");
        break;

      // Sets the current component to 'LoginForm' when requested.
      case "LoginForm":
        setComponent("LoginForm");
        break;

      // Sets the current component to 'RegisterForm' when requested.
      case "RegisterForm":
        setComponent("RegisterForm");
        break;
      // Sets the current component to 'RegisterForm' when requested.
      case "ResetPassword":
        setComponent("ResetPassword");
        break;

      // Default case does nothing if an unrecognized parameter is received.
      default:
        break;
    }
  };

  // Render the provider with the current component and the render function in the value prop.
  return (
    <RenderContext.Provider value={{ component, renderComponent }}>
      {children}{" "}
      {/* Render the children components wrapped by this provider. */}
    </RenderContext.Provider>
  );
};

// Export the provider and the context to be used in other components.
export { RenderProvider, RenderContext };
