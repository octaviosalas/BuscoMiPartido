import nodemailer from "nodemailer"


type VerifyAccountType = { 
    email: string,
    token: number,
    name: string
}

export const sendEmailToVerifyUserAccount = async ({email, token, name}: VerifyAccountType) => { 

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'obitsoftware@gmail.com', 
        pass: 'jghl xhdk bqju xtpj' 
      },
      tls: {
        rejectUnauthorized: false
      }
     });
       
     const mailOptions = {
      from: 'salasoctavio129@gmail.com', 
      to:  email, 
      subject: "Verificación de cuenta", 
      text:  `Hola ${name}, has creado tu cuenta exitosamente, solo queda confirmarla. Tu Token de confirmacion es ${token} y expirara en 15 minutos.`
    };
  
    await transporter.sendMail(mailOptions);
  };