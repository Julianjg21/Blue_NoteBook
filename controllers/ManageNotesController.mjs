import db from "../dataBase/DbConnection.mjs"; //Import the connection to the database

//Handler to save a new note
export const SaveNoteController = async (req, res) => {
  const { title, description, id } = req.body; //Extract the title, description and ID from the request body
  const userId = parseInt(id); //Convert the ID to an integer
  if (!title || !description ) {
    return res.status(400).json({
      success: false,
      message: "Completa los campos correctamente e inténtalo de nuevo.",
    });
  }
  //Insert the new note into the database
  db.query(
    "INSERT INTO notes (user_id, title, description) VALUES (?, ?, ?)",
    [userId, title, description],
    (error, results) => {
      if (error) {
        console.error("No se pudo guardar la nota:", error);
        return res.status(500).json({ error: "No se pudo guardar la nota" });
      }
      res.status(200).json({ message: "Nota creada exitosamente" });
    }
  );
};

//Handler to get notes from a user
export const GetNotesController = (req, res) => {
  const { user_id } = req.query;

  //Query the database to obtain the notes
  db.query(
    "SELECT * FROM notes WHERE user_id = ?",
    [user_id],
    (error, results) => {
      if (error) {
        console.error("No se pudo obtener las notas", error);
        return res.status(500).json({ error: "No se pudo obtener las notas" });
      }
      res
        .status(200)
        .json({ message: "Notas obtenidas con éxito", notes: results });
    }
  );
};

//Handler to delete a note
export const DeleteNoteController = async (req, res) => {
  const id = parseInt(req.params.id, 10); //Get the ID of the note to delete from the route parameters

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" }); //Verify that the ID is a valid number
  }

  try {
    //Wrap the query in a promise to use `await`
    const result = await new Promise((resolve, reject) => {
      db.query("DELETE FROM notes WHERE id = ?", [id], (error, results) => {
        if (error) {
          return reject(error); //Reject the promise if an error occurs
        }
        resolve(results); //Resolve the promise if the query was successful
      });
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.status(200).json({ message: "Nota eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la nota:", error);
    res.status(500).json({ message: "Error al eliminar la nota", error });
  }
};

//Handler to update a note
export const UpdateNoteController = async (req, res) => {
  const id = parseInt(req.params.id, 10); //Get the note ID from the route parameters
  const { title, description } = req.body; //Extract title and description from the request body
  if (!title || !description ) {
    return res.status(400).json({
      success: false,
      message: "Completa los campos correctamente e inténtalo de nuevo.",
    });
  }
  try {
    //Wrap the query in a promise to use `await`
    const result = await new Promise((resolve, reject) => {
      db.query(
        "UPDATE notes SET title = ?, description = ? WHERE id = ?",
        [title, description, id],
        (error, results) => {
          if (error) {
            return reject(error); //Reject the promise if an error occurs
          }
          resolve(results); //Resolve the promise if the query was successful
        }
      );
    });

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Nota no encontrada" });
    } else {
      res.status(200).json({ message: "Nota actualizada exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar la nota:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export default SaveNoteController;
