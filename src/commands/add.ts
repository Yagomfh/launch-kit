import { Command } from "commander";
import { addDocker } from "../actions/add/docker";
import { addPage } from "../actions/add/page";

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

    switch (feature) {
      case "docker":
        addDocker();
        break;
      case "page":
        addPage();
        break;
      default:
        console.log("Invalid feature");
    }
  });
