import path from "path"; // crea rutas es propio del sistema
import fs from "fs/promises"; // Sirve para manipular archivo que ya existen
import randomstring from "randomstring";
import sharp from "sharp";
import errors from "../../helpers/errors.helper.js";

const main = async (imagen, ancho) => {
  try {
    const uploadDir = path.join(process.cwd(), "..", process.env.UPLOADS_DIR);

    try {
      await fs.access(uploadDir); // accede a la carpeta.
    } catch (error) {
      await fs.mkdir(uploadDir); // si hay un error pues crea la carpeta.
    }

    // "sharp" toma la "data" de un archivo convierte la imagen en memoria y la puede manipular.
    const imgSharp = sharp(imagen.data); // toma la data o informacion de la imagen.
    imgSharp.resize(ancho); // redimensionamos el ancho de la imagen.
    const nameRandom = randomstring.generate(15) + ".jpg"; // generamos un nombre aleatorio al archivo.
    const imgPath = path.join(uploadDir, nameRandom); // se crea la direccion a partir de la carpeta y el nombre.

    await imgSharp.toFile(imgPath);
    return nameRandom;
  } catch (error) {
    errors.internalServerError(error.message, "SAVE_PHOTO_ERROR");
  }
};
export default main;
