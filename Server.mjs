import express from "express";
import helmet from "helmet";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import db from "./dataBase/DbConnection.mjs";
import LoginRoute from "./routes/AuthRoute.mjs";
import RegisterRoute from "./routes/RegisterRoute.mjs";
import NotesRoute from "./routes/ManageNotesRoute.mjs";
import bodyParser from "body-parser";
import TasksRoute from "./routes/ManageTasksRoute.mjs";
import ResetPassword from "./routes/ResetPasswordRoute.mjs";
//Load environment variables from .env file
dotenv.config({ path: "/configs.env" });


//Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3080; //Use port from environment variables or default port 3080

//Helmet to improve security
app.use(helmet());

//Configure CORS to allow requests from other domains
app.use(cors());

//Middleware to handle JSON in incoming requests
app.use(express.json());

//Configure the bodyParser middleware to manage request size
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

//Get the name of the current file and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configure the path to the 'public' folder on the client
const publicPath = path.join(__dirname, "client/build");


//Middleware to serve static files from the 'public' directory
app.use(express.static(publicPath));


//Application routes
app.use("/auth", LoginRoute); //Path for login
app.use("/createUser", RegisterRoute); //Path for user registration
app.use("/manageNotes", NotesRoute); //Route to manage notes
app.use("/manageTasks", TasksRoute); //Route to manage tasks
app.use("/resetPassword", ResetPassword); //Route to manage tasks

//redirect all the routes to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

//Database connection management
db.on("error", (err) => {
  console.error("Database connection error:", err);
});

//Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor creado en el puerto ${PORT}`);
  }
});
