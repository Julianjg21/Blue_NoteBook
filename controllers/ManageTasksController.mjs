import db from "../dataBase/DbConnection.mjs"; //Import the connection to the database

//Handler to save a new task
export const SaveTaskController = (req, res) => {
  const { title, description, due_date, priority, user_id } = req.body; //Extract data from the request body
  //Verify that all fields are provided
  if (!title || !description || !due_date || !priority || !user_id) {
    return res.status(400).json({
      success: false,
      message: "Completa los campos correctamente e inténtalo de nuevo.",
    });
  }

  //Insert the new task into the database
  db.query(
    "INSERT INTO tasks (user_id, title, description, due_date, status) VALUES (?, ?, ?, ?, ?)",
    [user_id, title, description, due_date, priority],
    (error, results) => {
      if (error) {
        console.error("No se pudo guardar la tarea:", error);
        return res.status(500).json({ error: "No se pudo guardar la tarea" });
      }
      res.status(200).json({ message: "Tarea creada exitosamente" });
    }
  );
};

//Controller to get tasks from a user
export const getTaskController = (req, res) => {
  const { user_id } = req.query; //Get the user ID of the query

  //Query the database to obtain the tasks
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [user_id],
    (error, results) => {
      if (error) {
        console.error("No se pudo obtener las tareas", error);
        return res.status(500).json({ error: "No se pudo obtener las tareas" });
      }
      res
        .status(200)
        .json({ message: "Tareas obtenidas con éxito", tasks: results });
    }
  );
};

//Controller to edit a task
export const EditTaskController = async (req, res) => {
  const id = parseInt(req.params.id, 10); //Get the task ID from the route parameters
  const { title, description, due_date, priority } = req.body; //Extract data from the request body

  //Verify that all fields are provided
  if (!title || !description || !due_date || !priority || !id) {
    return res.status(400).json({
      success: false,
      message: "Completa los campos correctamente e inténtalo de nuevo.",
    });
  }

  try {
    //Wrap the query in a promise to use `await`
    const result = await new Promise((resolve, reject) => {
      db.query(
        "UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?",
        [title, description, due_date, priority, id],
        (error, results) => {
          if (error) {
            return reject(error); //Reject the promise if an error occurs
          }
          resolve(results); //Resolve the promise if the query was successful
        }
      );
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    } else {
      res.status(200).json({ message: "Tarea actualizada exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//Handler to delete a task
export const deleteTaskController = async (req, res) => {
  const id = parseInt(req.params.id, 10); //Get the task ID from the route parameters
  //Verify that the ID is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    //Wrap the query in a promise to use `await`
    const result = await new Promise((resolve, reject) => {
      db.query("DELETE FROM tasks WHERE id = ?", [id], (error, results) => {
        if (error) {
          return reject(error); //Reject the promise if an error occurs
        }
        resolve(results); //Resolve the promise if the query was successful
      });
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};

export default SaveTaskController;
