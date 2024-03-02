import sendMail from "../../helpers/email.helper.js";

const main = async (email, recoverPassCode) => {
  const emailBody = `
        Se ha solicitado la recuperación de contraseña para este email en Diario de Viajes.      

        Utiliza  el siguiente código para crear una nueva contraseña: ${recoverPassCode}"

        Si no ha solicitado la recuperación de contraseña, ignora este mensaje.
        `;
  const emailSubject = `Recuperación de contraseña`;

  await sendMail(email, emailSubject, emailBody);
};

export default main;
