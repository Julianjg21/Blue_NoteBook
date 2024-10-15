// hooks/useDeleteNote.js
import { useState } from "react";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchAddNotes = () => {
  //the data of the alert to be activated is sent
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });

  const addNote = async (data) => {
    try {
      //send the data of the note we want to create
      await axios.post(API_ROUTES.addNotes, data);

      setAlert({
        show: true,
        title: "Success",
        message: "¡La nota se ha guardado con éxito!",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to update note:", error);
      setAlert({
        show: true,
        title: "Error",
        message: "No se ha podido guardar la nota. Intenta nuevamente.",
        variant: "danger",
      });
    } finally {
      //Hide alert after 5 seconds
      setTimeout(
        () => setAlert((prevAlert) => ({ ...prevAlert, show: false })),
        5000
      );
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return { alert, addNote, handleCloseAlert };
};

export default FetchAddNotes;
