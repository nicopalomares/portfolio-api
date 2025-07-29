'use strict'

module.exports = {
  async send(ctx) {
    const { name, email, message } = ctx.request.body

    try {
      // 1. Enviar email al administrador (tú)
      await strapi.plugin('email').service('email').send({
        to: 'nicolaspalomares360@gmail.com', // reemplaza con tu email real
        from: 'webmaster@nickytrip.com', // debe coincidir con el configurado en SMTP
        subject: `📬 Nuevo mensaje de ${name}`,
        html: `
          <h3>Nuevo mensaje recibido:</h3>
          <p><strong>Nombre de la empresa:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje:</strong><br/>${message}</p>
        `,
      })

      // 2. Enviar email al cliente
      await strapi.plugin('email').service('email').send({
        to: email,
        from: 'contact@nickytrip.com', // el mismo de tu SMTP
        subject: '✅ Thank you for contacting me',
        html: `
          <p>Hi ${name},</p>
          <p>Thank you for contacting me. I have received your message and will respond as soon as possible.</p>
          <p>Greetings, <br/>Nicolas Palomares</p>
        `,
      })

      ctx.send({ success: true, message: 'Correos enviados correctamente' })
    } catch (err) {
      console.error(err)
      ctx.status = 500
      ctx.send({ success: false, message: 'Error al enviar los correos' })
    }
  },
}