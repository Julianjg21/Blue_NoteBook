import React, { useState,useContext } from "react";
import { Modal, ModalHeader, Button } from "react-bootstrap";
import { RenderContext } from "../../../hooks/contexts/renderContext";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";
import {  useNavigate } from 'react-router-dom';
function ChangePassword({ code, email }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationModal, setConfirmationModal] = useState(false);

  const { renderComponent } = useContext(RenderContext); //Using context to change which component is rendered

  const closeConfirmationModal = () => {
    setConfirmationModal(false);
  }

  const navigate = useNavigate();

  const backMainPage = () => {
    window.location.reload();
    navigate("/main/login");
 }

  const resetPassword = async(event) => {
    event.preventDefault();
    const data = {
      email, code, "newPassword": password
    }
    if (password === confirmPassword) {

     try {
       await axios.post(API_ROUTES.changePassword, data);
       setConfirmationModal(true);
     } catch (error) {
        console.error(`Error al restablecer la contraseña, error: ${error}`)
     }

    } else {
      setErrorMessage("Las contraseñas no coinciden");
    }
  };

  return (
    <div className="container">

<Modal show={confirmationModal} onHide={closeConfirmationModal} centered>
      <ModalHeader closeButton>
        <Modal.Title className="fs-5 text-secondary">Confirmation</Modal.Title>
      </ModalHeader>
        <Modal.Body>
          <div className="row">
          <div className="col-1"></div>
            <div className="col-10 fw-bolder text-center">
              <p>"La contraseña se ha restablecido con éxito. Inicia sesión utilizando tu nueva contraseña."</p>
            </div>
            <div className="col-1"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Accept"
              variant="btn btn-outline-success"
              onClick={backMainPage}
          >Aceptar
            </Button>
            </Modal.Footer>
        </Modal>


      <div className="row d-none d-sm-block">
        <div className="col-5"></div>
        <div className="col-5"></div>
        <div className="col-2 mt-5"></div>
      </div>
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
          <h1 className="fs-6  fw-bold text-secondary mt-0 mt-md-4 text-center">
            Restablecer Contraseña
          </h1>
          <form onSubmit={resetPassword}>
            <div className="row p-3">
              <div className="col-12 mt-4 text-center">
                <label className="" htmlFor="newPassword">Ingresar nueva contraseña:</label>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 mt-4 ">
                    <input
                      id="newPassword"
                      className="w-100 rounded-5 border-secondary form-control"
                      placeholder="Ingresa tu nueva contraseña"
                      type="password"
                      onChange={(event) => { setPassword(event.target.value); setErrorMessage(""); }}
                      required
                      />
                    {/* Mostrar error si las contraseñas no coinciden */}
                    {errorMessage && (
                      <p className="text-danger p-0">{errorMessage}</p>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-4 text-center">
                    <label className="" htmlFor="confirmPassword">Confirmar nueva contraseña:</label>
                  </div>
                  <div className="col-12 mt-4 ">
                    <input
                      id="confirmPassword"
                      className="w-100 rounded-5 border-secondary form-control"
                      placeholder="Confirma tu nueva contraseña"
                      type="password"
                      required
                      onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        ; setErrorMessage("")}}
                    />
                     {/* Mostrar error si las contraseñas no coinciden */}
                     {errorMessage && (
                      <p className="text-danger">{errorMessage}</p>
                    )}
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
                <div className="col-12 mt-3  mb-1">
                  <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 mt-2">
                      <button
                        title="reset password"
                        className="w-100  p-2 btn btn-primary mb-2 fw-bolder"
                        type="submit"
                      >
                        Restablacer contraseña
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
  );
}

export default ChangePassword;
