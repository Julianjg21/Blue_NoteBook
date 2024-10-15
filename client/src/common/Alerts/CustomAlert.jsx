import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({ title, message, variant, show, onClose }) => {
  if (!show) return null; //If it is not visible, it is not rendered

  return (
    <Alert variant={variant} onClose={onClose} dismissible>
      {/*Optional title*/}
      {title && <Alert.Heading>{title}</Alert.Heading>}
      <p>{message}</p>
    </Alert>
  );
};

export default CustomAlert;
