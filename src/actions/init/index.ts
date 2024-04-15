import fs from "fs";
import { prompt } from "enquirer";
import { copyBoilerplate } from "../../utils/copy";
import { Config } from "../../utils/get-config";
import { populateFrontendEnv } from "./frontend";
import { populateBackendEnv } from "./backend";

const initAction = async () => {
  const answers: {
    name: string;
    backend: "nest" | "strapi";
    frontend: "vite-react" | "nextjs";
  } = await prompt([
    {
      type: "input",
      name: "name",
      message: "Your app name:",
    },
    {
      type: "select",
      name: "backend",
      initial: 0,
      message: "Choose your backend:",
      choices: ["strapi", "nest - Coming soon 🚧"],
    },
    {
      type: "select",
      name: "frontend",
      initial: 0,
      message: "Choose your frontend:",
      choices: ["vite-react", "nextjs - Coming soon 🚧"],
    },
  ]);

  // Create a directory with the app name
  fs.mkdirSync(answers.name);

  const config: Config = {
    name: answers.name,
    backend: {
      type: answers.backend,
      directory: "api",
      port: 3000,
    },
    frontend: {
      type: answers.frontend,
      directory: "web",
      port: 5173,
    },
  };

  if (answers.backend === "nest" || answers.frontend === "nextjs") {
    console.log(
      "\n🚧 This feature is coming soon! Please choose another option.\n"
    );
    return;
  }

  // Create a launchkit.json configuration file
  fs.writeFileSync(
    `${answers.name}/launchkit.json`,
    JSON.stringify(config, null, 2)
  );

  // Create apps directory
  fs.mkdirSync(`${answers.name}/apps`);

  // Create a backend directory and copy the boilerplate
  fs.mkdirSync(`${answers.name}/apps/api`);
  copyBoilerplate(answers.name, "backend", "api", answers.backend);
  populateBackendEnv(config);

  // Create a frontend directory and copy the boilerplate
  fs.mkdirSync(`${answers.name}/apps/web`);
  copyBoilerplate(answers.name, "frontend", "web", answers.frontend);
  populateFrontendEnv(config);

  // Create a README.md file
  fs.writeFileSync(
    `${answers.name}/README.md`,
    `# ${answers.name}\n\nThis is a monorepo created with Launchkit.`
  );

  console.log(`\n🚀 Your app is ready!`);
  console.log(`cd ${answers.name}`);
};

export { initAction };
