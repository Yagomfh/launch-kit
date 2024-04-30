export const emailConfirmationDocs = {
  strapi: (backendPort: number, frontendPort: number) => `
All required code added! 🚀

To finalize the setup, follow these steps:

1) Open your Strapi panel in a browser window.

2) Navigate to:
http://localhost:${backendPort}/admin/settings/users-permissions/advanced-settings

3) Enable the "Email confirmation" setting and set redirect URL to:
http://localhost:${frontendPort}/login?verified=true

4) Navigate to:
http://localhost:${backendPort}/admin/settings/users-permissions/email-templates

5) Click on "Email address confirmation" and update the shipper email with a verified SendGrid email.
  `,
  nest: () => "",
};
