import fs from "fs";

export type Config = {
  name: string;
  backend: {
    type: string;
    directory: string;
    port: number;
  };
  frontend: {
    type: string;
    directory: string;
    port: number;
  };
};

export const getConfig = (): Config => {
  try {
    return JSON.parse(fs.readFileSync("launchkit.json", "utf8"));
  } catch (error) {
    console.log(
      `\n🚨 launchkit.json not found!\n\nAre you sure this is a launchkit-cli project?\nOr that you're in the right directory?\n`
    );
    process.exit(1);
  }
};
