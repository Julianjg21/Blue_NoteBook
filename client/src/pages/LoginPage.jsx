import React, { useContext, useEffect } from "react";
import AuthContainer from "../components/login/AuthContainer";
import { RenderContext } from "../hooks/contexts/renderContext";
import LoginForm from "../components/login/LoginForm";
import RegisterForm from "../components/login/RegisterForm";
import { Routes, Route, useNavigate } from "react-router-dom";
import ResetPassword from "../components/login/resetPassword/ResetPassword";
import bluenotebook3 from "../assets/bluenotebook3.jpg"
function LoginPage() {
  const { component } = useContext(RenderContext);

  const navigate = useNavigate();
  //render the received component
  useEffect(() => {
    if (component === "LoginForm") {
      navigate("/main/login");
    } else if (component === "RegisterForm") {
      navigate("/main/register");
    } else if (component === "ResetPassword") {
      navigate("/main/ResetPassword");
    } else {
      navigate("/main/");
    }
  }, [component, navigate]);

  return (
    <div className="background-image align-content-center overflow-hidden">

      <img src={bluenotebook3} alt="bluenotebook " className=" bluenotebook-jpg" />
      <div className="row ">
        <div className="col-1 col-md-1 col-lg-3"></div>
        {/*The received component is rendered in the global state */}
        <div className="col-10 col-md-10 col-lg-6  ">
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<AuthContainer />} />
          </Routes>
        </div>
        <div className="col-1 cold-md-1 col-lg-3"></div>
      </div>
    </div>
  );
}

export default LoginPage;
