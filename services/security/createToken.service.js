import jwt from "jsonwebtoken"

const main = (tokenInfo) => {
  // variables para el token:
  const { SECRET_KEY, EXPIRE_TOKEN } = process.env;

  // Creamos el token
  const token = jwt.sign(tokenInfo, SECRET_KEY, {
    expiresIn: EXPIRE_TOKEN,
  });
  return token;
};

export default main;
