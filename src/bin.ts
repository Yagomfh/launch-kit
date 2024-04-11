#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const version = "1.2.0";

  const program = new Command()
    .name("launchkit-cli")
    .description(
      "Generate boilerplate code to quickly launch your first product"
    )
    .version(version, "-v, --version", "display the version number");

  program.addCommand(init).addCommand(add);

  program.parse();
}

main();
