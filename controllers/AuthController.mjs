import { compare } from "bcrypt"; //Import the function to compare passwords
import JWT from "jsonwebtoken"; //Import the library to create JWT tokens
import db from "../dataBase/DbConnection.mjs"; //Import the connection to the database
import dotenv from "dotenv"; //Import dotenv to handle environment variables
dotenv.config({ path: "../configs.env" }); //Configure dotenv to load environment variables

//Export the secret key to sign the JWT tokens
export const jwtSecret = process.env.JWT_SECRET;

//Function that verifies the received data and creates a JWT token
export const authController = (req, res) => {
  const { email, password } = req.body; //Extract email and password from request body
  //Query the database to check if the email exists
  db.query(
    "SELECT * FROM users WHERE email = ?", //SQL query to find the user by email
    [email],
    async (err, userResults) => {
      if (err) {
        return res
          .status(500)
          .send("Error, el servidor no pudo buscar el correo electrónico", err);
      }
      if (userResults.length === 0) {
        return res
          .status(401)
          .send(
            "El correo electrónico ingresado no está registrado. Por favor, verifica y vuelve a intentarlo."
          );
      }

      const user = userResults[0]; //Take the first user found
      const userData = { email: user.email, name: user.name, id: user.id }; //Prepare user data for response
      const passwordFound = user.password; //Save the found password to the database

      //Verify that the password entered matches the one registered in the database
      const passwordMatch = await compare(password, passwordFound);

      //If the password matches, create the security token
      if (passwordMatch) {
        const token = JWT.sign(
          { id: user.userRegistrationId, email: user.email }, //Payload del token
          jwtSecret, //Secret key
          { expiresIn: "8h" } //Token expiration time
        );
        return res.status(200).send({ token, userData }); //Send the token and user data in the response
      } else {
        return res
          .status(401)
          .send(
            "Contraseña incorrecta. Por favor, verifica e inténtalo de nuevo."
          );
      }
    }
  );
};

export default authController;
