import joi from "joi";
import imgSchema from "../img.schemas.js";

const addPhotoShema = joi.object({
  photo: imgSchema.required(),
});

export default addPhotoShema;
