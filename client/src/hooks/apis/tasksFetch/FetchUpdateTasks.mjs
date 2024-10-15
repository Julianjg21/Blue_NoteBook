// hooks/useDeleteNote.js
import { useState } from "react";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchUpdateTasks = () => {
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });

  const updateTask = async (id, data) => {
    try {
      //send update data of the selected note
      await axios.put(`${API_ROUTES.editTasks}/${id}`, data);

      setAlert({
        show: true,
        title: "Éxito",
        message: "¡Tarea modificada con éxito!",
        variant: "success",
      });

      //Hide alert after 5 seconds
    } catch (error) {
      console.error("Failed to update task:", error);
      //Show an error message if something fails
      setAlert({
        show: true,
        title: "Error",
        message: "No se ha podido modificar la tarea. Intenta nuevamente.",
        variant: "danger",
      });
    } finally {
      setTimeout(
        () => setAlert((prevAlert) => ({ ...prevAlert, show: false })),
        5000
      );
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return { alert, updateTask, handleCloseAlert };
};

export default FetchUpdateTasks;
