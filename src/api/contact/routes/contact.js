module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/contact/send',
      handler: 'contact.send',
      config: {
        auth: false, // Cambia a true si quieres protección
      },
    },
  ],
}