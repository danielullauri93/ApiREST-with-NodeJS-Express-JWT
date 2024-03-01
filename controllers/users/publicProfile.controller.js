const main = async (req, res, next) => {
  try {
    const user = req.user;

    // Al objeto usamos "delete" para eliminar las propiedades de un objeto (user en este caso) que no quiero recuperar
    // Son campos que estan en la DB creada
    delete user.password;
    delete user.modifiedAt;
    delete user.email;
    delete user.active;
    delete user.role;
    delete user.regirstrationCode;
    delete user.recoverPassCode;

    res.send({
      status: "success",
      message: "Usuario obtenido con éxito",
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default main;
