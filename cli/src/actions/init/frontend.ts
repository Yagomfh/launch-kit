import { execHygen } from "../../utils/exec-hygen";
import { Config } from "../../utils/get-config";

export const populateFrontendEnv = async (config: Config) => {
  let root = "";

  if (config.backend.type === "strapi") {
    root = "/api";
  }

  await execHygen([
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
