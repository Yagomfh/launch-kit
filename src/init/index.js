import inquirer from "inquirer";
import { copyBackend } from "./backend.js";
import fs from "fs";

const init = async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Your app name:",
    },
    {
      type: "list",
      name: "backend",
      message: "Choose your backend:",
      choices: ["nest", "strapi"],
    },
    {
      type: "list",
      name: "frontend",
      message: "Choose your frontend:",
      choices: ["vite-react", "nextjs"],
    },
  ]);

  // Create a directory with the app name
  fs.mkdirSync(answers.name);

  // Create a launchkit.json configuration file
  fs.writeFileSync(
    `${answers.name}/launchkit.json`,
    JSON.stringify(
      {
        name: answers.name,
        backend: {
          type: answers.backend,
          directory: "api",
        },
        frontend: {
          type: answers.frontend,
          directory: "web",
        },
      },
      null,
      2
    )
  );

  // Create apps directory
  fs.mkdirSync(`${answers.name}/apps`);

  // Create a backend directory
  fs.mkdirSync(`${answers.name}/apps/api`);

  // Copy boilerplate backend code
  copyBackend(answers.name, answers.backend);

  // Create a frontend directory
  fs.mkdirSync(`${answers.name}/apps/web`);

  // Create a README.md file
  fs.writeFileSync(
    `${answers.name}/README.md`,
    `# ${answers.name}\n\nThis is a monorepo created with Launchkit.`
  );

  console.log(`\n🚀 Your app is ready!`);
  console.log(`cd ${answers.name}`);
};

export { init };
