import path from "node:path";
import { Plop, run } from "plop";
import fs from "fs";

/**
 *
 * @param {string} __dirname
 * @param {minimist.ParsedArgs} argv
 */
const addDocker = async (__dirname: string, argv) => {
  Plop.prepare(
    {
      cwd: argv.cwd,
      configPath: path.join(__dirname, "plopfile.js"),
      preload: argv.preload || [],
      completion: argv.completion,
    },
    (env) => Plop.execute(env, run)
  );
};

const dockerPlopPrompts = [
  {
    type: "confirm",
    name: "backend",
    message: "Add Dockerfile to your backend?",
  },
  {
    type: "confirm",
    name: "frontend",
    message: "Add Dockerfile to your frontend?",
  },
];

const dockerPlopAction = (data) => {
  let actions = [];
  const config = JSON.parse(fs.readFileSync("launchkit.json", "utf8"));
  if (data.backend) {
    // Add Dockerfile to backend
    actions.push({
      type: "add",
      path: `${process.cwd()}/apps/${config.backend.directory}/${
        config.backend.type
      }/Dockerfile`,
      templateFile: "_templates/docker/Dockerfile.hbs",
    });
    // Add .dockerignore to backend
    actions.push({
      type: "add",
      path: `${process.cwd()}/apps/${config.backend.directory}/${
        config.backend.type
      }/.dockerignore`,
      templateFile: "_templates/docker/dockerignore.hbs",
    });
    console.log(`🐳 Dockerfile and .dockerignore added to your backend!`);
  }
  return actions;
};

export { addDocker, dockerPlopAction, dockerPlopPrompts };
