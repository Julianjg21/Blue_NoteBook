import JWT from "jsonwebtoken"; //Import the JSON Web Token library
import dotenv from "dotenv"; //Import dotenv to handle environment variables

//Load environment variables from configuration file
dotenv.config({ path: "./configs.env" });

//Middleware to verify JWT token
export const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization; //Get the authorization header
  const token = authHeader && authHeader.split(" ")[1]; //Extract the token from the header

  //Check if the token is present
  if (!token) {
    return res
      .status(403)
      .json({ valid: false, message: "Token not provided" });
  }

  //Verify the token using the secret key
  JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      //If there is an error, the token is invalid
      return res.status(401).json({ valid: false, message: "Invalid token" });
    }

    //If the token is valid, store the decoded user information in the request object
    req.user = decoded;
    return res.status(200).json({ valid: true, message: "Token verified" });
  });
};

export default verifyToken;
