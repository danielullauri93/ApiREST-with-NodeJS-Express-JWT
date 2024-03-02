import expres from "express";
import userController from "../controllers/users/index.controller.js";
import { authUser } from "../middlewares/security/index.middleware.js";
import { userExists } from "../middlewares/user/index.middleware.js";

const router = expres.Router();

router.post(
  "/users/register",
  userController.register
); /* Ruta para registrar */
router.get(
  "/users/validate/:registrationCode",
  userController.validate
); /* Ruta para validar correo */
router.post("/users/login", userController.login); /* Ruta para logearse */
router.get(
  "/users/profile",
  authUser,
  userExists,
  userController.profile
); /* Ruta para autenticar y si el usurario existe */
router.get(
  "/users/profile/:userId",
  userExists,
  userController.publicProfile
); /* Para obtener un perfil público */
router.put(
  "/users/avatar",
  authUser,
  userExists,
  userController.editAvatar
); /** Para agregar un avatar(foto) y tambien para actualizarlo */
router.post('/users/password/recover', userController.passwordRecover) /** Ruta para recuperar contraseña */
router.put("/users/password/recover", userController.passwordUpdateByRecover) /** Ruta para actualizar contraseña */

export default router;
/** Notas: */
// GET : se usa cuando se quiere obtener una respuesta de la solicitud realizada.
// POST:  se usa cuando se quiere realizar una acción.
// PUT:   todo lo que sea actualizar.
/** El authUser valida al usuariio */
/** El "userExists" lo que hace el obtener información del usuario  */
/** En la ruta para recuperar o cambiar contraseña no se necesita autenticación */
