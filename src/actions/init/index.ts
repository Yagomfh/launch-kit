import inquirer from "inquirer";
import fs from "fs";
import { prompt } from "enquirer";
import { copyBackend } from "./backend";
// import { copyBackend } from "./backend";

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
      choices: ["strapi", "nest"],
    },
    {
      type: "select",
      name: "frontend",
      initial: 0,
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

export { initAction };
