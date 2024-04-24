import { execHygen } from "../../utils/exec-hygen";
import { generateRandomBase64String } from "../../utils/generate-keys";
import { Config } from "../../utils/get-config";

export const populateBackendEnv = async (config: Config) => {
  await execHygen([
    "core",
    `add-${config.backend.type}-env`,
    "--app",
    config.name,
    "--service",
    config.backend.directory,
    "--APP_KEYS",
    [
      generateRandomBase64String(22),
      generateRandomBase64String(22),
      generateRandomBase64String(22),
      generateRandomBase64String(22),
    ].join(","),
    generateRandomBase64String(22),
    "--API_TOKEN_SALT",
    generateRandomBase64String(22),
    "--JWT_SECRET",
    generateRandomBase64String(22),
    "--ADMIN_JWT_SECRET",
    generateRandomBase64String(22),
    "--TRANSFER_TOKEN_SALT",
    generateRandomBase64String(22),
  ]);
};
