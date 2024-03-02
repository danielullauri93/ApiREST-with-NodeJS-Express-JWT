import path from "path"; // crea rutas es propio del sistema
import fs from "fs/promises"; // Sirve para manipular archivo que ya existen
import errors from "../../helpers/errors.helper.js";

const main = async (fileName) => {
  try {
    const imgPath = path.join(
      process.cwd(),
      "..",
      process.env.UPLOADS_DIR,
      fileName
    );

    try {
      await fs.access(imgPath); // accede al archivo si existe
    } catch (error) {
      return;
    }

    await fs.unlink(imgPath); // "unlink" elimina el archivo
  } catch (error) {
    errors.internalServerError(error.message, "DELETE_PHOTO_ERROR");
  }
};

export default main;
