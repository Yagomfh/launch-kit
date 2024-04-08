import { Command } from "commander";
import { initAction } from "../actions/init";

export const init = new Command()
  .name("init")
  .description("initialize your project with launchkit")
  .action(initAction);
