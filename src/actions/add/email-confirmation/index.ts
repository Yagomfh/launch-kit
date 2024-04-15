import { getConfig } from "../../../utils/get-config";
import { execHygen } from "../../../utils/exec-hygen";

export const addEmailConfirmation = async () => {
  const config = getConfig();

  if (!config.email?.provider) {
    throw new Error("Please add an email provider first.");
  }

  console.log(
    "Let's force your users to confirm their email before they can login! 🚀\n"
  );

  await execHygen([
    "core",
    `add-${config.frontend.type}-page`,
    "--app",
    config.name,
    "--service",
    config.frontend.directory,
    "--page",
    "emailConfirmation",
    "--path",
    "/email-confirmation",
    "--auth",
    "public",
  ]);
};
