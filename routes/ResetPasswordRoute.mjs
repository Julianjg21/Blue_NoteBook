import express from "express";
import {
  RequestResetController,
  verifyCodeController,
  changePasswordController,
} from "../controllers/ResetPasswordController.mjs";
import verifyResetCodeMiddleware from "../middlewares/verifyResetCodeMiddleware.mjs";
//router that connects the routes with the main APP
const router = express.Router();
//route to verify the email and send the password reset security code
router.post("/request-reset", RequestResetController);
//Ruta para verificar el codigo de seguridad
router.post("/Verify-code", verifyCodeController);
//path to verify the code and reset the password
router.post(
  "/change-password",
  verifyResetCodeMiddleware,
  changePasswordController
);

export default router;
