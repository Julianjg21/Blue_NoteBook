import React, { useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleCheck,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { RenderContext } from "../../hooks/contexts/renderContext";
import API_ROUTES from "../../configs/ApiEndPoints.mjs";
import CustomAlert from "../../common/Alerts/CustomAlert";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { renderComponent } = useContext(RenderContext);

  const [iconAlert, setIconAlert] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, email, password };

    try {
      const sendFormData = await axios.post(API_ROUTES.sendKeysRegister, data);
      setIconAlert(faCircleCheck);
      setAlert({
        show: true,
        title: "Éxito",
        message: sendFormData.data.message,
        variant: "success",
      });
      setTimeout(() => setAlert((prevAlert) => ({ ...prevAlert, show: false })), 7000);
    } catch (error) {
      setIconAlert(faCircleExclamation);
      setAlert({
        show: true,
        title: "Error",
        message: error.response?.data?.error || "Completa los campos correctamente.",
        variant: "danger",
      });
      setTimeout(() => setAlert((prevAlert) => ({ ...prevAlert, show: false })), 7000);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };


  return (
    <div className="p-0">
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
      <CustomAlert
        title={alert.title}
        message={
          <>
            {alert.message} <FontAwesomeIcon icon={iconAlert} />
          </>
        }
        variant={alert.variant}
        show={alert.show}
        onClose={handleCloseAlert}
      />
     </div>
        <div className="col-1"></div>
      </div>
      {/*Top section with spacing */}
      <div className="row">
        <div className="col-5"></div>
        <div className="col-5"></div>
        <div className="col-2 mt-0 mt-md-5"></div>
      </div>
      {/*Registration form title */}
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
          <h1 className="fs-6 text-primary mt-0 mt-md-2 text-center">Blue NoteBook</h1>
        </div>
        <div className="col-3"></div>
      </div>

      {/*Registration form */}
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 auth-cols">
          <div className="row bg-white">
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/*Button to return to the previous component */}
                <div className="col-1 p-0">
                  <button
                    title="Go back"
                    type="button"
                    className="btn btn-outline-primary border-0 rounded-0"
                    onClick={() => renderComponent("AuthContainer")}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                </div>
                <div className="col-10">
                  <h1 className="fs-5 mt-1 mt-md-3 text-primary-emphasis text-center">
                    Registrarse
                  </h1>
                </div>
                <div className="col-1"></div>
              </div>

              <div className="row mt-0 mt-md-2">
                <div className="col-12 d-flex flex-column mt-0 mt-md-4">
                  <label
                    className="mb-1 loginLabelTxt fw-semibold"
                    htmlFor="userName"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Ingresa tu nombre"
                    id="userName"
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
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
                    onChange={(event) => setEmail(event.target.value)}
                    required/>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-12 d-flex flex-column">
                  <label
                    className="loginLabelTxt mt-2 mb-1 fw-semibold"
                    htmlFor="userPassword"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="rounded-5 border-secondary form-control mt-1"
                    placeholder="Enter a password"
                    id="userPassword"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
              </div>

              {/*Form submit button */}
              <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-4 mb-4">
                  <button
                    title="register"
                    type="submit"
                    className="w-100 pt-2 pb-2 btn btn-outline-dark"
                  >
                    Registrar
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

export default RegisterForm;