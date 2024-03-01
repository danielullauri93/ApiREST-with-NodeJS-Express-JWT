import randomstring from "randomstring";
import bcrypt from "bcrypt";
import validateShema from "../../helpers/validate.helper.js";
import shema from "../../shemas/user/register.shema.js";
import userService from "../../services/user/index.service.js";
import errors from "../../helpers/errors.helper.js";

const main = async (req, res, next) => {
  try {
    // Recibir info en req que vamos a tener que validar
    await validateShema(shema, req.body);
    const { email, username, password } = req.body;

    // Generamos un código aleatorio
    const registrationCode = randomstring.generate(30);

    // Validamos que no exista un usuario ya registrado
    const users = await userService.getByUsernameOrEmail(email, username); // para ver si exite el mismo usuario
    if (users.length > 0) {
      errors.conflictError(
        "El username o email ya se encuentra registrado",
        "USER_REGISTER_ERROR"
      );
    }

    // Encriptamos contrasea
    const passwordEncoded = await bcrypt.hash(password, 5); // el numero "5" es la cantidad de rondas que lo va encriptar

    // Registramos
    await userService.register(
      email,
      username,
      passwordEncoded,
      registrationCode
    );

    // Enviamos email
    await userService.registerSendEmail(email, registrationCode);

    res.send({
      status: "success",
      message: "Usuario registrado con éxito!",
    });
  } catch (error) {
    next(error);
  }
};

export default main;
