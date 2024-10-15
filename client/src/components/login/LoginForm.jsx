import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { RenderContext } from "../../hooks/contexts/renderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import API_ROUTES from "../../configs/ApiEndPoints.mjs";
import CustomAlert from "../../common/Alerts/CustomAlert";
function LoginForm() {



  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });
  //Defining states to handle mail, password, error message and error modal state
  const [password, setPassword] = useState(""); //State for the password
  const [email, setEmail] = useState(""); //Status for the mail
  const { renderComponent } = useContext(RenderContext); //Using context to change which component is rendered
  //Function to handle form submission


  const handleSubmit = async (event) => {
    event.preventDefault(); //Prevent default form behavior
    //Create an object with the form data
    const data = {
      email,
      password,
    };

    try {
      const sendFormData = await axios.post(API_ROUTES.sendKeysLogin, data);

      //Extract the received token from the response
      const token = sendFormData.data.token;

      //Extract the authenticated user data from the response
      const userData = sendFormData.data.userData;

      //Save the token in a cookie
      Cookies.set("authToken", token, {
        path: "/", //Make the cookie accessible from any path
        secure: true, //Only send the cookie on secure connections
        sameSite: "strict", //Prevent CSRF attacks
      });

      //Save the authenticated user's data in a cookie
      Cookies.set("userData", JSON.stringify(userData), {
        path: "/",
        secure: true,
        sameSite: "strict",
      });

      //Redirect user to protected path after login
      window.location.href = "/main/home";
    } catch (error) {
      //If authentication fails, reset the form fields and display the error message
      setEmail(""); //Clear the mail field
      setPassword(""); //Clear the password field
      setAlert({
        show: true,
        title: "Error",
        message: error.response?.data?.error ||
        "Completa los campos correctamente e intentalo de nuevo.",
        variant: "danger",
      });
      setTimeout(
        () => setAlert((prevAlert) => ({ ...prevAlert, show: false })),
        7000
      );
      console.error(
        "Authentication failed",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <div className="">
      <div className="row d-none d-sm-block">
        <div className="col-5"></div>
        <div className="col-5"></div>
        <div className="col-2 mt-5"></div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6  text-info align-content-center auth-cols "  style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',

      }}
>
          {/* Custom alert component */}
          <CustomAlert
            title={alert.title}
            message={
              <>
                {alert.message} <FontAwesomeIcon icon={faCircleExclamation} />
              </>
            }
            variant={alert.variant}
            show={alert.show}
            onClose={handleCloseAlert}
          />

        </div>
        <div className="col-1"></div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
          <h1 className="fs-6 text-primary mt-0 mt-md-2 text-center">Blue NoteBook</h1>
        </div>
        <div className="col-1"></div>
      </div>

      {/*Login form */}
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 auth-cols">
          <div className="row bg-white">
            <form className="form-control pt-0" onSubmit={handleSubmit}>
              {/*Button to return to the previous window*/}
              <div className="row">
                <div className="col-1 p-0">
                  <button
                    title="back"
                    type="button"
                    className="btn btn-outline-primary border-0 rounded-0"
                    onClick={() => renderComponent("AuthContainer")}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className="col-10 mt-4">
                  <h1 className="fs-5 text-primary-emphasis text-center">
                    Iniciar Sesión
                  </h1>
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mt-2">
                <div className="col-12 d-flex flex-column mt-4">
                  <label
                    className="mb-1 loginLabelTxt fw-semibold"
                    htmlFor="userEmail"
                  >
                    Correo
                  </label>
                  <input
                    type="email"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Ingresa tu correo electrónico"
                    id="userEmail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-12 d-flex flex-column">
                  <label
                    className="loginLabelTxt mt-2 mb-1 fw-semibold"
                    htmlFor="userPassword"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Ingresa tu contraseña"
                    id="userPassword"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
              </div>

              {/*Submit button */}
              <div className="row">
                <div className="col-2"></div>
                <div className="col-3"></div>
                <div className="col-7"><button title="reset password"className="border border-0 mt-1 text-primary bg-white" type="button" onClick={() => renderComponent("ResetPassword")}>¿Restablecer Contraseña?</button></div>
              </div>
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-3 mb-4">
                  <button title="Get into"
                    type="submit"
                    className="w-100 pt-2 pb-2 btn btn-outline-dark"
                  >
                    Ingresar
                  </button>
                </div>
                <div className="col-2"></div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

//Export the LoginForm component
export default LoginForm;
