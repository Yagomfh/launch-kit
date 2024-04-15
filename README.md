<img alt="Logo" src="https://lh3.googleusercontent.com/d/1z5CDK62SpglkxTHJTpOLTWH3JQTp9Nc2">
<p align="center">
<img alt="NPM Version" src="https://img.shields.io/npm/v/launchkit-cli">
<img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/Yagomfh/launch-kit/publish-package.yml">
</p>

CLI to generate boilerplate code to quickly launch your first product

## Quick Start

Create a new project using the `init` command.

```bash
npx launchkit-cli@latest init

Your app name: [your-app-name]

Choose your backend:
strapi
nest - Coming soon 🚧

Choose your frontend:
vite-react
nextjs - Coming soon 🚧
```

Open the project in your favorite code editor and start both the frontend and backend servers.

### Backend

```bash
cd [your-app-name]/apps/api
yarn
yarn develop
```

### Frontend

```bash
cd [your-app-name]/apps/web
yarn
yarn dev
```

## Usage

Use the `init` command to initialize a new project.

```bash
npx launchkit-cli@latest init
```

## add

Use the `add` command to add features to your project.

```bash
npx launchkit-cli@latest add [feature]
```

### Features

- `docker`: adds a Dockerfile and .dockerignore to your project
- `page`: adds a new page to your frontend project
- `email`: adds email provider to your backend so you can send emails
- `email-confirmation`: forces users to confirm their email address before they can login

### Example

```bash
npx launchkit-cli@latest add docker
```

## Troubleshooting

### Email confirmation not working

SendGrid requires you to verify your email address before you can send emails.

If the `from` adn `replyTo` emails you setup are not verified the provider wo'nt be able to send emails.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
