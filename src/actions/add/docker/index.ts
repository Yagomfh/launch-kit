import { execHygen } from "../../../utils/exec-hygen";
import { getConfig } from "../../../utils/get-config";

const addDocker = async () => {
  const config = getConfig();
  execHygen([
    "core",
    "add",
    "docker",
    "strapi",
    "--service",
    config.backend.directory,
  ]);
};

export { addDocker };
