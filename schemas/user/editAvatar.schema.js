import joi from "joi";
import imgSchema from "../img.schemas.js";

const editAvatarShema = joi.object({
  avatar: imgSchema.required(),
});

export default editAvatarShema;
