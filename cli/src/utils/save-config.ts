import fs from "fs";
import { Config } from "./get-config";

export const saveConfig = async (config: Config) => {
  fs.writeFileSync("launchkit.json", JSON.stringify(config, null, 2));
};
