import { Command } from "commander";
import { addActions } from "../actions";

type AddFeatures = "docker" | "page" | undefined;

export const add = new Command()
  .name("add")
  .description("add a new feature")
  .argument("[feature]", "feature to add")
  .action((feature: AddFeatures) => {
    if (!feature) {
      console.log(
        "Please provide a feature to add: launchkit-cli add <feature>\n- docker\n- page"
      );
      return;
    }

    if (!addActions[feature]) return console.log("Invalid feature");

    addActions[feature]();
  });
