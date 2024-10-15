// src/components/login/AuthContainer.jsx
import React, { useContext } from "react";
import { RenderContext } from "../../hooks/contexts/renderContext";
function AuthContainer() {
  /*render component*/
  const { renderComponent } = useContext(RenderContext);

  return (
    <div className="p-0  ">
      <div className="row d-none d-sm-block mt-0 mt-md-5"></div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 bg-white text-info align-content-center border border-1 border-primary auth-cols rounded-1">
          <h1 className="fs-6 text-primary mt-0 mt-md-2  text-center">
            Blue NoteBook
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 bg-white align-content-center border border-1 border-primary auth-cols">
          <p className="text-dark mt-3">
            Inicia sesión para poder guardar tus notas y verlas cuando quieras.
            Si ya estás registrado, inicia sesión.
          </p>
          <div className="row">
            <div className="col-12 col-md-12">
              <button
                title="login"
                onClick={() => renderComponent("LoginForm")}
                className="w-100 p-2 btn btn-primary mb-2 fw-bolder"
              >
                Iniciar Sesion
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 bg-white  align-content-center border border-1 border-primary auth-cols rounded-bottom-3">
          <p className="text-dark mt-3">
            Al registrarte, podrás guardar tus notas y verlas cuando quieras. Si
            ya estás registrado, inicia sesión.
          </p>

          <div className="row">
            <div className="col-12">
              <button
                title="register"
                onClick={() => renderComponent("RegisterForm")}
                className="w-100 p-2 btn btn-light  mb-2 border-secondary text-primary fw-bolder mt-3 mb-4"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthContainer;
