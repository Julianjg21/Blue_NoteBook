// hooks/useDeleteNote.js
import { useState } from "react";
import axios from "axios";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchAddTasks = () => {
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    variant: "",
  });

  const addTask = async (data) => {
    try {
      //send data to create new task
      const response = await axios.post(API_ROUTES.addTasks, data);

      setAlert({
        show: true,
        title: "Éxito",
        message: "¡Tarea registrada con éxito!",
        variant: "success",
      });
      return response;
    } catch (error) {
      console.error("Failed to add the  task:", error);
      //Show an error alert if something fails
      setAlert({
        show: true,
        title: "Error",
        message: "No se ha podido registrar la tarea. Intenta nuevamente.",
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

  return { alert, addTask, handleCloseAlert };
};

export default FetchAddTasks;
