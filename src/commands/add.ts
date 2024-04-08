import { Command } from "commander";
import { addDocker } from "../actions/add/docker";

type AddFeatures = "docker" | "auth" | undefined;

export const add = new Command()
  .name("add")
  .description("add a new feature")
  .argument("[feature]", "feature to add")
  .action((feature: AddFeatures) => {
    if (!feature) {
      console.log(
        "Please provide a feature to add: launchkit-cli add <feature>\n- docker\n- auth"
      );
      return;
    }

    switch (feature) {
      case "docker":
        addDocker();
        break;
      case "auth":
        // addAuth(__dirname);
        break;
      default:
        console.log("Invalid feature");
    }
  });
