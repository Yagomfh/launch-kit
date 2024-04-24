const stripe = require("stripe")("sk_test_qc5Xp48X8kyuIJQx1Z1XGJk800sseBPi4Z");
/**
 * A set of functions called "actions" for `payments`
 */

export default {
  createCheckoutSession: async (ctx, next) => {
    const domain = ctx.request.headers.origin;
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: "price_1P6By8IIU7ONuguJ891MUj6X",
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${domain}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    ctx.body = { clientSecret: session.client_secret };
  },

  sessionStatus: async (ctx, next) => {
    const session = await stripe.checkout.sessions.retrieve(
      ctx.query.session_id
    );

    ctx.body = {
      status: session.status,
      customer_email: session.customer_details.email,
    };
  },
};
