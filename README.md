# launchkit-cli

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

### Example

```bash
npx launchkit-cli@latest add docker
```

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).
