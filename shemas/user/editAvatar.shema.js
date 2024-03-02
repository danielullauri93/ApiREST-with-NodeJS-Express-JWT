import joi from "joi";
import imgShema from "../img.shemas.js";

const editAvatarShema = joi.object({
  avatar: imgShema.required(),
});

export default editAvatarShema;
