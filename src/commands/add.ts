import { Command } from "commander";
import { getConfig } from "@/src/utils/get-config";

// @ts-ignore
const __dirname = new URL(".", import.meta.url).pathname;

export const add = new Command()
  .name("add")
  .description("add a new feature")
  .argument("[feature]", "feature to add")
  .action((feature?: string, opts) => {
    if (!feature) {
      console.log(
        "Please provide a feature to add: launchkit-cli add <feature>\n- docker\n- auth"
      );
      return;
    }

    // Get launchkit.json config
    // const config = getConfig();

    console.log(__dirname);
    console.log("Feature added: ", feature);
    console.log("Options: ", opts);
  });
