import { addDocker } from "./docker";
import { addEmail } from "./email";
import { addPage } from "./page";

export const addActions = {
  docker: addDocker,
  page: addPage,
  email: addEmail,
};
