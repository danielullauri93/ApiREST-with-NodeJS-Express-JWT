import expres from "express";
import useController from "../controllers/users/index.controller.js";
import { authUser } from "../middlewares/security/index.middleware.js";
import { userExists } from "../middlewares/user/index.middleware.js";

const router = expres.Router();

router.post(
  "/users/register",
  useController.register
); /* Ruta para registrar */
router.get(
  "/users/validate/:registrationCode",
  useController.validate
); /* Ruta para validar correo */
router.post("/users/login", useController.login); /* Ruta para logearse */
router.get(
  "/users/profile",
  authUser,
  userExists,
  useController.profile
); /* Ruta para autenticar y si el usurario existe */

export default router;
