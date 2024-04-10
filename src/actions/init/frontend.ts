import { execHygen } from "../../utils/exec-hygen";
import { Config } from "../../utils/get-config";

export const populateEnv = (config: Config) => {
  let root = "";

  if (config.backend.type === "strapi") {
    root = "/api";
  }

  execHygen([
    "core",
    `add-${config.frontend.type}-env`,
    "--app",
    config.name,
    "--service",
    config.frontend.directory,
    "--root",
    root,
    "--port",
    config.backend.port.toString(),
  ]);
};
