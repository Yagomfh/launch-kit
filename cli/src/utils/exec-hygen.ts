import path from "path";
import { runner, Logger } from "hygen";

const defaultTemplates = path.join(__dirname, "../_templates");

export const execHygen = async (cmd: string[]) => {
  return runner(cmd, {
    templates: defaultTemplates,
    cwd: path.join(process.cwd()), // Should just be process.cwd(), the tmp folder is for testing purposes
    logger: new Logger(console.log.bind(console)),
    debug: !!process.env.DEBUG,
    exec: (action, body) => {
      console.log(action, body);
      const opts = body && body.length > 0 ? { input: body } : {};
      return require("execa").command(action, { ...opts, shell: true });
    },
    createPrompter: () => require("enquirer"),
  });
};
