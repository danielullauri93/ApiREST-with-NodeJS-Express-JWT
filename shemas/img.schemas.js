import joi from "joi";
import joiMsg from "./joi.messages.js";

const imgShema = joi.object({
  name: joi.string().required().messages(joiMsg.errorMsg),
  mimetype: joi
    .string()
    .valid("image/pnj", "image/jpeg")
    .required()
    .messages(joiMsg.errorMsg),
  size: joi.number().max(5000000).required().messages(joiMsg.errorMsg),
}).unknown(true); /** "unknown" permite campos que no conocemos  */

export default imgShema;
