import jwt from "jsonwebtoken";
import errors from "../../helpers/errors.helper.js";
import e from "express";
const main = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      errors.notAuthorizedError("El token es un campo requerido");
    }

    let tokenInfo;

    // Verifica que nuestro tocken concuerde con nuestro (SECRET KEY) que esta almacenado y que no este vencido.
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET_KEY);
    } catch (error) {
      errors.notAuthorizedError("El token no es válido");
    }

    // Se guarda en user porque tiene el "id" y el "role"
    req.user = tokenInfo;

    next();
  } catch (error) {}
};

export default main;
