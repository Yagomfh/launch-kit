import { prompt } from "enquirer";
import { execHygen } from "../../../utils/exec-hygen";
import { getConfig } from "../../../utils/get-config";
import { emailDocs } from "../../../documentation";
import { saveConfig } from "../../../utils/save-config";

const addEmail = async () => {
  const config = getConfig();
  console.log("Let's add a email provider to your backend! 🚀\n");
  const answers: {
    defaultFrom: string;
    defaultReplyTo: string;
    testAddress: string;
  } = await prompt([
    {
      type: "input",
      name: "defaultFrom",
      message: "Provide a default 'from' address (i.e. defaultfrom@email.com):",
    },
    {
      type: "input",
      name: "defaultReplyTo",
      message: "Provide a default 'reply to' address (i.e. replyTo@email.com):",
    },
    {
      type: "input",
      name: "testAddress",
      message: "Provide a default 'test' address (i.e. test@email.com):",
    },
  ]);

  await execHygen([
    "core",
    `add-email-${config.backend.type}`,
    "--service",
    config.backend.directory,
    "--from",
    answers.defaultFrom,
    "--replyTo",
    answers.defaultReplyTo,
    "--test",
    answers.testAddress,
  ]);

  saveConfig({
    ...config,
    email: {
      provider: "sendgrid",
    },
  });

  console.log(emailDocs[config.backend.type]);
};

export { addEmail };
