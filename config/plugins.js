module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'strapi-provider-email-nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.strato.de'),
        port: env.int('SMTP_PORT', 587),
        secure: false,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_USERNAME'),
        defaultReplyTo: env('SMTP_USERNAME'),
      },
    },
  },
});