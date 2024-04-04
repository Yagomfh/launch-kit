#!/usr/bin/env node
import { init } from "@/src/commands/init";
import { Command } from "commander";

import { getPackageInfo } from "@/src/utils/get-package-info";
import { add } from "@/src/commands/add";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const packageInfo = getPackageInfo();

  const program = new Command()
    .name("launchkit-cli")
    .description(
      "Generate boilerplate code to quickly launch your first product"
    )
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number"
    );

  program.addCommand(init).addCommand(add);

  program.parse();
}

main();
