import db from "../dataBase/DbConnection.mjs"; //Import the connection to the database
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt"; //Import bcrypt for password management
import dotenv from "dotenv"; //Import dotenv to handle environment variables
dotenv.config({ path: "../configs.env" }); //Configure dotenv to load environment variables
// Controller for requesting password reset
export const RequestResetController = async (req, res) => {
  const { email } = req.body;

  // Step 1: Verificar si el usuario existe
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, userResults) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al verificar el usuario", error: err });
      }

      if (userResults.length === 0) {
        return res.status(404).json({ message: "El email no se encuentra registrado." });
      }

      // Step 2: Generar un código único y su expiración
      const resetCode = crypto.randomBytes(3).toString("hex");
      const expiration = Date.now() + 3600000; // 1 hora

      // Step 3: Guardar el código en la base de datos
      db.query(
        "UPDATE users SET resetCode = ?, codeExpiration = ? WHERE email = ?",
        [resetCode, expiration, email],
        async (err) => {
          if (err) {
            return res.status(500).json({
              message: "Error al guardar el código de restablecimiento",
              error: err,
            });
          }

          // Step 4: Enviar correo con el código de restablecimiento
          try {
            const USER = process.env.USER;
            const PASS = process.env.PASS;

            const transporter = nodemailer.createTransport({
              service: "gmail",
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: USER,
                pass: PASS,
              },
            });

            const mailOptions = {
              from: "Blue Notebook",
              to: email,
              subject: "Restablecimiento de Contraseña",
              html: `
              <div class="content" style="background-color: white; margin: 20px auto; padding: 20px; width: 90%; max-width: 600px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color:#1877F2;">Blue Notebook</h1>
                <h2 style="color: #333;">Recuperación de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña. Usa el siguiente código de recuperación:</p>
                <p style="font-size: 20px; font-weight: bold; color: #4CAF50;">${resetCode}</p>
                <p>Este código es válido por 1 hora.</p>
              </div>
              `,
            };

            // Step 5: Esperar a que el correo se envíe correctamente
            await transporter.sendMail(mailOptions);

            // Si el correo fue enviado correctamente, enviar una respuesta de éxito
            return res.json({
              message: "Código de restablecimiento enviado al correo.",
            });
          } catch (error) {
            // Si ocurre un error al enviar el correo
            return res.status(500).json({
              message: "Error al enviar el correo de restablecimiento",
              error: error.message,
            });
          }
        }
      );
    }
  );
};

// Controller for verifying reset code
export const verifyCodeController = (req, res) => {
  const { email, code } = req.body;

  db.query(
    "SELECT codeExpiration, resetCode FROM users WHERE email = ?",
    [email],
    (err, userResults) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al verificar el usuario", error: err });
      }

      if (
        !userResults.length ||
        Date.now() > userResults[0].codeExpiration ||
        userResults[0].resetCode !== code
      ) {
        return res.status(400).json({ message: "Código inválido o expirado" });
      }

      res.json({ message: "Código verificado correctamente" });
    }
  );
};

// Controller for changing the password
export const changePasswordController = (req, res) => {
  const { email, newPassword } = req.body;

  // Hash de la nueva contraseña
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al cambiar la contraseña", error: err });
    }

    db.query(
      "UPDATE users SET codeExpiration = NULL, resetCode = NULL, password = ? WHERE email = ?",
      [hashedPassword, email],
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error al actualizar la contraseña", error: err });
        }

        res.json({ message: "Contraseña actualizada correctamente" });
      }
    );
  });
};

export default RequestResetController;
