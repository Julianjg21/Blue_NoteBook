import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./utils/PrivateRoute.mjs";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App ">
      <Router>
        <Routes>
          <Route path="/main/*" element={<LoginPage />} />

          {/*Main route that handles private routes */}
          <Route path="/" element={<PrivateRoute />}>
            {/*Automatically redirect from "/" to "/home" */}
            <Route index element={<Navigate to="/main/home" replace />} />

            {/*Defines the parent route with "/*" suffix to allow child routes */}
            <Route path="/main/home/*" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
