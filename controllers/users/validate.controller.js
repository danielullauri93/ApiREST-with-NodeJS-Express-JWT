import validateHellper from "../../helpers/validate.helper.js";
import { validateSchema } from "../../shemas/user/validate.shema.js";
import userService from "../../services/user/index.service.js";
import errors from "../../helpers/errors.helper.js";

const main = async (req, res, next) => {
  try {
    const { registrationCode } = req.params;

    // Validar Shema(esquema)
    await validateHellper(validateSchema, { registrationCode });

    const users = await userService.getByRegistrationCode(registrationCode);

    if (users.length > 1) {
      errors.conflictError(
        "Hemos detectado más de un usuario con el mismo registrationCode",
        "USER_VALIDATE_ERROR"
      );
    }

    if (users.length == 0) {
      errors.conflictError(
        "Usuario activado con anterioridad",
        "USER_VALIDATE_ERROR"
      );
    }

    await userService.activate(users[0]);

    res.send({
      status: "success",
      message: "Usuario activado con éxito"
    })
  } catch (error) {
    next(error);
  }
};

export default main;
