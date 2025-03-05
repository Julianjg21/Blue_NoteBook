import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import API_ROUTES from "../../../configs/ApiEndPoints.mjs";

const FetchGetTasks = () => {
  const [tasksList, setTasksList] = useState([]);
  const [loading, setLoading] = useState(true); //Loading status
  const [error, setError] = useState(null); //Error status

  //Función para obtener las notas desde la API
  const handleGetTasks = async () => {
    const userData = JSON.parse(Cookies.get("userData")); //Obtener datos del usuario
    const user_id = userData.id; //Extraer el ID del usuario

    try {
      const getData = await axios.get(API_ROUTES.getTasks, {
        params: { user_id }, //Send user ID as a query parameter
      });

      //Format the dates of each task before setting the state
      if (getData.data.tasks && Array.isArray(getData.data.tasks)) {
        const tasksWithFormattedDate = getData.data.tasks.map((task) => ({
          ...task,
          due_date: new Date(task.due_date).toISOString().split("T")[0],
          created_at: new Date(task.created_at).toISOString().split("T")[0],
        }));

        setTasksList(tasksWithFormattedDate);
      }
    } catch (error) {
      setError(error.response ? error.response.data : error.message); //Save error
      console.error(
        "The server has not worked",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false); //End loading status
    }
  };

  //Returns notes, loading status, error and a refresh function
  return { tasksList, loading, error, refreshTasks: handleGetTasks };
};

export default FetchGetTasks;
