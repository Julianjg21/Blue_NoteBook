// hooks/useDeleteNote.js
import { useState } from "react";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchUpdateNotes = () => {
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });

  const updateNote = async (id, data) => {
    try {
      await axios.put(`${API_ROUTES.updateNotes}/${id}`, data);

      setAlert({
        show: true,
        title: "Success",
        message: "¡Nota modificada con exito!",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to update note:", error);
      setAlert({
        show: true,
        title: "Error",
        message: "No se ha podido modificar la nota. Intenta nuevamente.",
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

  return { alert, updateNote, handleCloseAlert };
};

export default FetchUpdateNotes;
