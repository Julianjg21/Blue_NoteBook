import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";

import App from "./App"; //Import the main component of the application
import { RenderProvider } from "./hooks/contexts/renderContext"; //Import the rendering context
import { AuthProvider } from "./hooks/contexts/AuthContext.mjs"; //Import the authentication context
import { AppContextStateProvider } from "./hooks/contexts/AppContextState.mjs"; //Import the application state context

//Gets the root element of the DOM where the application will be rendered
const root = ReactDOM.createRoot(document.getElementById("root"));
//Render the application by wrapping with context providers
root.render(
  <React.StrictMode>
    <AppContextStateProvider>
      {" "}
      {/*Provider for the application state */}
      <RenderProvider>
        {" "}
        {/*Provider for the rendering context */}
        <AuthProvider>
          {" "}
          {/*Provider for authentication */}
          <App /> {/*Main component of the application */}
        </AuthProvider>
      </RenderProvider>
    </AppContextStateProvider>
  </React.StrictMode>
);
