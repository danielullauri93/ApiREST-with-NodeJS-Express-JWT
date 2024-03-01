import errors from "./errors.helper.js"

const main = async (shema, body)=>{

  try {
    await shema.validateAsync(body)
  } catch (error) {
    console.log(error)
    errors.schemaValidationError(error.details[0]?.message)
  }
}

export default main