import { addDocker } from "./docker";
import { addEmail } from "./email";
import { addEmailConfirmation } from "./email-confirmation";
import { addPage } from "./page";

export const addActions = {
  docker: addDocker,
  page: addPage,
  email: addEmail,
  "email-confirmation": addEmailConfirmation,
};
