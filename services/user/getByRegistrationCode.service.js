// Servicio para la validacion del correo
import getPool from "../../db/getPool.js";
import errors from "../../helpers/errors.helper.js";

const main = async (registrationCode) => {
  try {
    const pool = await getPool();
    const sqlQuery = "SELECT * FROM users WHERE registrationCode = ?";
    const value = [registrationCode];
    const [users] = await pool.query(sqlQuery, value);

    return users;
  } catch (error) {
    errors.internalServerError(error.message, "DATA_CONSULT_ERROR");
  }
};

export default main;
