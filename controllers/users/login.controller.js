import bcrypt from "bcrypt";
import validateShema from "../../helpers/validate.helper.js";
import shema from "../../shemas/user/login.shema.js";
import userService from "../../services/user/index.service.js";
import securityService from "../../services/security/index.service.js";
import errors from "../../helpers/errors.helper.js";

const main = async (req, res, next) => {
  try {
    // Creamos validación
    await validateShema(shema, req.body);

    const users = await userService.getByUsernameOrEmail("",req.body.username);

    if (users.length === 0) {
      errors.notFoundError("Usuario no encontrado", "USER_NOT_FOUND");
    }

    // Validar el pass con el dato y el encriptado
    const validPassword = await bcrypt.compare(
      req.body.password,
      users[0].password
    );
    /*nota: nunca se desencripta una contraseña*/

    // Si la contraseña no es vallida:
    if (!validPassword) {
      errors.notAuthorizedError(
        "Credenciales incorrectas",
        "INVALID_CREDENTIALS"
      );
    }

    // Si el usuario no esta activado
    if (!users[0].active) {
      if (users[0].registrationCode != null) {
        errors.forbiddenError(
          "El usuario aún no fue activado",
          "PENDING_ACTIVATION"
        );
      } else {
        errors.forbiddenError("El usuario está desactivado", "USER_INACTIVE");
      }
    }

    // Creamos un token (no va usuario, ni email, ni pass) - el token es valido porq uno lo crea
    const tokenInfo = {
      id: users[0].id,
      role: users[0].role,
    };

    // traemos el servicio del token
    const token = securityService.createToken(tokenInfo);

    res.send({
      status: "success",
      message: "Usuario logeado con éxito",
      data: { token }
    });
  } catch (error) {
    next(error);
  }
};

export default main;
