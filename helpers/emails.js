import nodemailer from 'nodemailer';

export const emailRegistro = async datos => {
    const { nombre, email, token } = datos;

    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Informacion del email
    await transport.sendMail({
        from: '"Administrador de registro de Pedidos" <cuentas@registroPedidos.com>',
        to: email,
        subject: 'Confirma tu cuenta "RegistroPedidos"',
        text: 'Confirma tu cuenta en RegistroPedidos',
        html: `
          <p>Hola ${nombre} Confirma tu cuenta de "RegistroPedidos"</p>
          <p>Tu cuenta esta ya casi lista!, solo nos falta comprobar tu correo electronico dandole click
          al siguiente enlace: 

          <a href="${process.env.FRONTEND_URL}/confirmarCuenta/${token}" >Confirmar Cuenta</a>

          <p>Si no creaste esta cuenta, Ignora este mensaje</p>
        `
    });
}

export const emailOLvidePassword = async datos => {
  const { nombre, email, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

    // Informacion del email
    await transport.sendMail({
        from: '"Administrador de registro de Pedidos" <cuentas@registroPedidos.com>',
        to: email,
        subject: 'Reestablece tu cuenta - RegistroPedidos',
        text: 'Reestablece tu password',
        html: `
          <p>Hola ${nombre} has solicitado reestablecer tu password</p>
          <p>Dale click al siguiente enlace para generar tu nuevo Password: 

          <a href="${process.env.FRONTEND_URL}/olvidePassword/${token}" >Reestablecer Passowrd</a>

          <p>Si no solicitaste este email, puedes ignorar este mensaje</p>
        `
    });
}

