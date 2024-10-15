import db from "../dataBase/DbConnection.mjs"; //Import the connection to the database
import bcrypt from "bcrypt"; //Import bcrypt for password management

//Handler to register a new user
export const RegisterController = async (req, res) => {
  const { email, name, password } = req.body; //Extract data from the request body

  //Verify that all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Completa los campos correctamente e inténtalo de nuevo.",
    });
  }

  try {
    //Generate the password hash asynchronously
    const passwordHash = await bcrypt.hash(password, 10);

    //Wrap the query in a promise to use `await`
    await new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (email, name, password) VALUES (?, ?, ?)",
        [email, name, passwordHash],
        (error, results) => {
          if (error) {
            return reject(error); //Reject the promise if an error occurs
          }
          resolve(results); //Resolve the promise if the query was successful
        }
      );
    });

    //Responds successfully if the insertion was successful
    res.status(201).json({
      success: true,
      message: `El usuario: ${name}  se ha registrado correctamente.`,
    });
  } catch (error) {
    console.error("Error guardando el usuario:", error); //Error log for the server

    //Responds with a status of 500 and an error message
    if (error.code === "ER_DUP_ENTRY") {
      res.status(400).json({
        error:
          "El correo electrónico ya se encuentra registrado. Por favor, usa otro.",
      });
    } else {
      res.status(500).json({
        error:
          "El servidor no pudo guardar los datos. Por favor, inténtalo de nuevo.",
      });
    }
  }
};

export default RegisterController;
