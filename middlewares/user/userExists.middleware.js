// Este es un middleware de autenticación está devolviendo la información del token
import userService from "../../services/user/index.service.js";
import errors from "../../helpers/errors.helper.js"

// manda el numero de usuario
const main = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.params.userId;
    const users = await userService.getById(userId);

    if(errors.length === 0){
      errors.notFoundError("Usuario no encontrado", "USER_NOT_FOUND")
    }

    req.user = users[0];
    next();
  } catch (error) {
    next(error);
  }
};

export default main;
