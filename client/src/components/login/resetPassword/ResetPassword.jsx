import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import VerifyCodeReset from "./VerifyCodeReset";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";
import { RenderContext } from "../../../hooks/contexts/renderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";
import { Modal } from "react-bootstrap";
import CustomAlert from "../../../common/Alerts/CustomAlert";

function ResetPassword() {
  const [nextStep, setNextStep] = useState(false);
  const [email, setEmail] = useState("");
  const { renderComponent } = useContext(RenderContext);
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const abortControllerRef = useRef(null); // Referencia para AbortController

  const sendEmail = async (event) => {
    event.preventDefault();
    const data = { email };

    setLoading(true);
    abortControllerRef.current = new AbortController(); //Create a new AbortController instance

    try {
      const response = await axios.post(API_ROUTES.resetPassword, data, {
        signal: abortControllerRef.current.signal, //Associate the signal
      });

      //If the response is successful, move to the next step
      if (response.status === 200) {
        setNextStep(true);
      } else {
        //If not 200, handle error
        const errorMessage =
          response.data?.message || "Error desconocido. Inténtalo de nuevo.";
        setAlertData(errorMessage);
        setShowAlert(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error desconocido. Inténtalo de nuevo.";
      console.error(`Error en la validación del email: ${errorMessage}`);
      setAlertData(errorMessage);
      setShowAlert(true);
    } finally {
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);

      setLoading(false);
    }
  };

  const closeLoadingModal = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); //Cancel the request
    }
    setLoading(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {nextStep ? (
        <VerifyCodeReset email={email} />
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
                {alertData} <FontAwesomeIcon icon={faCircleExclamation} />
              </>
            }
            variant="danger"
            show={showAlert}
            onClose={handleCloseAlert}
          />
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
              <h1 className="fs-6 text-primary text-secondary mt-0 mt-md-2 text-center">
                Blue NoteBook
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 bg-white border border-1 border-primary auth-cols rounded-1 border border-2 border-primary-emphasis">
              <button
                title="Go back"
                type="button"
                className="border-0 rounded-0 bg-white"
                onClick={() => renderComponent("AuthContainer")}
              >
                <FontAwesomeIcon className="text-primary" icon={faArrowLeft} />
              </button>
              <h1 className="fs-6 fw-bold text-secondary mt-0 mt-md-4 text-center">
                Restablecer Contraseña
              </h1>
              <form
                className="form-control border border-0"
                onSubmit={sendEmail}
              >
                <div className="row p-3">
                  <div className="col-12 mt-4 text-center">
                    <label className="" htmlFor="registeredEmail">
                      Ingresa tu correo electrónico registrado:
                    </label>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12 mt-4">
                        <input
                          id="registeredEmail"
                          className="w-100 rounded-5 border-secondary form-control"
                          placeholder="Ingresa tu correo electrónico"
                          type="email"
                          onChange={(event) => setEmail(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-12 mt-5 mb-5">
                      <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8 mt-2">
                          <button
                            title="search"
                            className="w-100 p-2 btn btn-primary mb-2 fw-bolder"
                            type="submit"
                          >
                            Buscar
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
      <div>
        <Modal
          className=""
          show={loading}
          centered
          backdrop="static"
          keyboard={false}
          onHide={closeLoadingModal} // Function to close the modal
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-secondary"></Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-center">
              <Spinner animation="grow" size="sm" variant="success" />
              <Spinner animation="grow" variant="primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <p className="text-black mt-3">Loading...</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ResetPassword;
