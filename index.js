#! /usr/bin/env node
import minimist from "minimist";
import { init } from "./src/init/index.js";
import { addDocker } from "./src/add/docker/index.js";
import fs from "fs";

const args = process.argv.slice(2);
const argv = minimist(args);

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (argv._[0] === "init") {
  init();
}

if (argv._[0] === "add") {
  // Check if launchkit.json exists
  try {
    fs.statSync(`${process.cwd()}/launchkit.json`);
  } catch (error) {
    console.log(
      `\n🚨 launchkit.json not found!\n\nAre you sure this is a launch kit project?\nOr that you're in the right directory?\n`
    );
    process.exit(1);
  }

  switch (argv._[1]) {
    case "docker":
      addDocker(__dirname, argv);
  }
}
