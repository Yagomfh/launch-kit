import { prompt } from "enquirer";
import { execHygen } from "../../../utils/exec-hygen";
import { getConfig } from "../../../utils/get-config";

const addPage = async () => {
  console.log("Let's add a new page to your frontend! 🚀\n");
  const config = getConfig();
  const answers: {
    name: string;
    path: string;
    auth: "public" | "private";
  } = await prompt([
    {
      type: "input",
      name: "name",
      message: "Give it a name:",
    },
    {
      type: "input",
      name: "path",
      message: "Give a path (i.e /home or /users/:id):",
    },
    {
      type: "select",
      name: "auth",
      initial: 0,
      message: "Is this page public or private:",
      choices: ["public", "private"],
    },
  ]);

  execHygen([
    "core",
    `add-${config.frontend.type}-page`,
    "--app",
    config.name,
    "--service",
    config.frontend.directory,
    "--page",
    answers.name,
    "--path",
    answers.path,
    "--auth",
    answers.auth,
  ]);
};

export { addPage };
