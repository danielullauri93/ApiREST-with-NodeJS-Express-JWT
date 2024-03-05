import schema from "../../schemas/user/editAvatar.schema.js";
import fileService from "../../services/files/index.service.js";
import userService from "../../services/user/index.service.js";
import validateSchema from "../../helpers/validate.helper.js";

const main = async (req, res, next) => {
  try {
    // Validamos los archivos
    await validateSchema(schema, req.files || {});

    // Almacenar nueva foto
    const fileName = await fileService.savePhoto(req.files.avatar, 150);

    // Actualizar base de datos
    try {
      await userService.updateAvatar(req.user, fileName); // probamos que la imagen se haya actualizado.
    } catch (error) {
      await fileService.deleteFile(fileName); // si falla eliminamos la imagen.
      next(error);
    }

    // Eliminar foto vieja
    if (req.user.avatar) await fileService.deleteFile(req.user.avatar); // si habia avatar pues la borra sino no.

    res.send({
      status: "success",
      message: "Avatar(Foto) actualizado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default main;
