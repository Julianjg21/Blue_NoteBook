import express from "express";
import RegisterController from "../controllers/RegisterController.mjs";

//router that connects the routes with the main APP
const router = express.Router();
//Access the controller TO register a new user
router.post("/register", RegisterController);

export default router;
