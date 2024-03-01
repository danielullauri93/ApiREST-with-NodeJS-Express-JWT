// Este servicio el trabajo que hace es guardar en la base de datos la información que llega validada
import getPool from "../../db/getPool.js";
import errors from "../../helpers/errors.helper.js";

const main = async (email, username, password,  registrationCode) => {
  try {
    const pool = await getPool(); // conexión

    const sqlQuery =
      "INSERT INTO users (email, username, password, registrationCode) VALUES (?,?,?,?)"; // sql
    const values = [email, username, password, registrationCode]; // variables

    const [response] = await pool.query(sqlQuery, values); // respuesta

    // si viene con 1 se inserto correctamente
    if (response.affectedRows !== 1) {
      // affectedRows = fila afectada
      errors.conflictError(
        "Error al insertar nuevo usuario",
        "INSERT_USER_ERROR"
      );
    }

    console.log(response);

    return response;
  } catch (error) {
    errors.internalServerError(error.message, "DATA_INSERT_ERROR");
  }
};

export default main;
