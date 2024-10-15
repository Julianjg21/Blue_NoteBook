import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import API_ROUTES from "../../configs/ApiEndPoints.mjs";

//authentication context
//An authentication context is created so that its state can be shared between multiple components.
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //`isAuthenticated` maintains the state of whether the user is authenticated or not.
  //`isLoading` indicates whether the authentication check is being loaded.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //Function to verify the authentication token stored in cookies.
    const verifyToken = async () => {
      //Gets the token stored in the cookie called "authToken".
      const token = Cookies.get("authToken");

      if (token) {
        try {
          //If there is a token, a POST request is sent to the server to verify its validity.
          const response = await axios.post(API_ROUTES.verifyToken, null, {
            //The token is sent in the request headers with the authorization format "Bearer".
            headers: { Authorization: `Bearer ${token}` },
          });
          //If the response indicates that the token is valid, `isAuthenticated` is updated to true.
          setIsAuthenticated(response.data.valid);
        } catch (error) {
          //If there is an error, the token and any associated user data are removed from the cookies.
          Cookies.remove("authToken", {
            path: "/",
            secure: true,
            sameSite: "strict",
          });
          Cookies.remove("userData", {
            path: "/",
            secure: true,
            sameSite: "strict",
          });
          //Updates `isAuthenticated` to false since authentication failed.
          setIsAuthenticated(false);
        }
      } else {
        //If there is no token, set `isAuthenticated` to false.
        setIsAuthenticated(false);
      }
      //Finally, set `isLoading` to false to indicate that the verification process has completed.
      setIsLoading(false);
    };

    //The function is called to verify the token when the component is mounted.
    verifyToken();
  }, []);

  //The context provider exposes the authentication state and loading state to any child components that need it.
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook to easily access the authentication context from any component.
export const useAuth = () => useContext(AuthContext);
