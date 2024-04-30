import { getConfig } from "../../../utils/get-config";
import { execHygen } from "../../../utils/exec-hygen";
import { emailConfirmationDocs } from "../../../documentation";

export const addEmailConfirmation = async () => {
  const config = getConfig();

  if (!config.email?.provider) {
    throw new Error("Please add an email provider first.");
  }

  console.log(
    "\nLet's force your users to confirm their email before they can login! 🚀\n"
  );

  await execHygen([
    "core",
    `add-email-confirmation-${config.frontend.type}`,
    "--service",
    config.frontend.directory,
  ]);

  console.log(
    emailConfirmationDocs[config.backend.type](
      config.backend.port,
      config.frontend.port
    )
  );
};
