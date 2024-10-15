import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/contexts/AuthContext.mjs";

const PrivateRoute = () => {
 //Destructuring the authentication and loading state
  const { isAuthenticated, isLoading } = useAuth();

//Display a loading message while authentication is being verified
  if (isLoading) {
    return <div>Loading... Please wait.</div>;
  }

 //Check if the user is authenticated to allow access to the route
  return isAuthenticated ? <Outlet /> : <Navigate to="/main" />;
};

export default PrivateRoute;
