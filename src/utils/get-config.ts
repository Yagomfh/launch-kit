import fs from "fs";

export const getConfig = () => {
  try {
    return fs.statSync(`${process.cwd()}/launchkit.json`);
  } catch (error) {
    console.log(
      `\n🚨 launchkit.json not found!\n\nAre you sure this is a launch kit project?\nOr that you're in the right directory?\n`
    );
    process.exit(1);
  }
};
