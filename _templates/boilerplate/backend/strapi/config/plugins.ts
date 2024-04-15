export default ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "notifications@oria-marine.com",
        defaultReplyTo: "notifications@oria-marine.com",
        testAddress: "notifications@oria-marine.com",
      },
    },
  },
  "users-permissions": {
    config: {
      register: {
        allowedFields: ["firstName", "lastName"],
      },
    },
  },
});
