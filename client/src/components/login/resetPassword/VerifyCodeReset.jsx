import React, { useState, useContext } from "react";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";
import { RenderContext } from "../../../hooks/contexts/renderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import CustomAlert from "../../../common/Alerts/CustomAlert";
function VerifyCodeReset({ email }) {
  const [nextStep, setNextStep] = useState(false);
  const [code, setCode] = useState();
  const { renderComponent } = useContext(RenderContext); //Using context to change which component is rendered

  const [showAlert, setShowAlert] = useState(false);

  const validateCode = async (event) => {
    const data = {
      code,
      email,
    };
    try {
      event.preventDefault();
      await axios.post(API_ROUTES.verifyCode, data);
      setNextStep(true);
    } catch (error) {
      setShowAlert(false);
      console.error(`Error al validar el codigo, error: ${error}`);
    }
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {nextStep ? (
        <ChangePassword code={code} email={email} />
      ) : (
        <div className="container">
          <div className="row d-none d-sm-block">
            <div className="col-5"></div>
            <div className="col-5"></div>
            <div className="col-2 mt-5"></div>
          </div>
          {/* Custom alert component */}
          <CustomAlert
            title="ERROR"
            message={
              <>
                Error al validar el codigo,Porfavor revise que el codigo este
                bien ingresado y sea el correcto.{" "}
                <FontAwesomeIcon icon={faCircleExclamation} />
              </>
            }
            variant="danger"
            show={showAlert}
            onClose={handleCloseAlert}
          />
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
              <h1 className="fs-6 text-primary mt-0 mt-md-2 text-center">
                Blue NoteBook
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 bg-white  align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
              <h1 className="fs-6  fw-bold  text-secondary mt-0 mt-md-4 text-center">
                Restablecer Contraseña
              </h1>
              <form onSubmit={validateCode}>
                <div className="row p-3">
                  <div className="col-12 mt-4 text-center">
                    <label className="" htmlFor="securityCode">
                      Ingresa el codigo de seguridad enviado al correo:
                      <span className="text-primary">{email}</span>
                    </label>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 mt-4 ">
                        <input
                          id="securityCode"
                          className="w-100 rounded-5 border-secondary form-control"
                          placeholder="Ingresa el codigo de seguridad"
                            type="text"
                            required
                          onChange={(event) => setCode(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-1"></div>
                      <div className="col-2"></div>
                      <div className="col-9">
                        <button
                          title="return to menu"
                          className="border border-0 mt-2 text-primary bg-white"
                          type="button"
                          onClick={() => renderComponent("AuthContainer")}
                        >
                          ¿Volver al menu principal?
                        </button>
                      </div>
                    </div>
                    <div className="col-12 mt-4  mb-3">
                      <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8 mt-2">
                          <button
                            title="confirm"
                            className="w-100  p-2 btn btn-primary  fw-bolder"
                            type="submit"
                          >
                            confirmar
                          </button>
                        </div>
                        <div className="col-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyCodeReset;
