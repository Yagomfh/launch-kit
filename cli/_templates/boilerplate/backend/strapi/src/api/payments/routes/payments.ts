export default {
  routes: [
    {
      method: "POST",
      path: "/create-checkout-session",
      handler: "payments.createCheckoutSession",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/session-status",
      handler: "payments.sessionStatus",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
