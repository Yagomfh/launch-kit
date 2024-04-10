export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    let idx = 0;

    // Change the path of the login and register route
    strapi.plugins["users-permissions"].routes["content-api"].routes.map(
      ({ handler }) => {
        if (handler == "auth.callback")
          strapi.plugins["users-permissions"].routes["content-api"].routes[
            idx
          ].path = "/auth/login";
        if (handler == "auth.register")
          strapi.plugins["users-permissions"].routes["content-api"].routes[
            idx
          ].path = "/auth/register";
        idx++;
        return;
      }
    );
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
