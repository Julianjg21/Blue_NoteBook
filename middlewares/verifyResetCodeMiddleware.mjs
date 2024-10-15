import db from "../dataBase/DbConnection.mjs"; //Import the connection to the database

const verifyResetCodeMiddleware = (req, res, next) => {
  const { email, code } = req.body;


  db.query(
    "SELECT codeExpiration, resetCode FROM users WHERE email = ?",
    [email],
    (err, userResults) => {
      if (err) {
      
        return res
          .status(500)
          .json({ message: "Error al verificar el código", error: err });
      }

      if (
        !userResults.length ||
        userResults[0].resetCode !== code ||
        Date.now() > userResults[0].codeExpiration
      ) {
        return res.status(400).json({ message: "Código inválido o expirado" });
      }

      next();
    }
  );
};
export default verifyResetCodeMiddleware;
