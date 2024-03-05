import joi from 'joi' // validar datos
import joiMsg from '../joi.messages.js'

const registerSchema = joi.object({
  username: joi
    .string() // texto
    .min(3) // minimo 3 caracteres
    .max(30) // maximo 30 caracteres
    .required() // obligado
    .pattern(/^\S*$/) // no debe tener campos vacios
    .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgUsername }), // mensaje de error respectivo
  password: joi
    .string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
    )
    .required()
    .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword }),
})

export default registerSchema