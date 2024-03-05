import errors from "../../helpers/errors.helper.js";

const main = async (req, res, next) => {
  try {
    if (req.user.id !== req.entry.userId) {
      errors.notAuthorizedError("No tienes permisos para editar esta entrada");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default main;

// Se fija que el que quiere editar sea el mismo propietario que el que envio el token para autenticación
