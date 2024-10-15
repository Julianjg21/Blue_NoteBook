import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.mjs";
import authController from "../controllers/AuthController.mjs";

//router that connects the routes with the main APP
const router = express.Router();
//route for verifying data received in the login
router.post("/login", authController);

//This route is protected and will only be accessed if the verifyToken middleware passes JWT token verification
router.post("/authMiddleware", verifyToken);

export default router;
