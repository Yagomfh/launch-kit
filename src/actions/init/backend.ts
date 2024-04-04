import path from "path";
import fs from "fs-extra";

const sourceDir = path
  // @ts-ignore
  .dirname(new URL(import.meta.url).pathname)
  .split("/src")[0];

const copyBackend = (app: string, name: "nest" | "strapi") => {
  const source = `${sourceDir}/_templates/boilerplate/backend/${name}`;
  const destination = `./${app}/apps/api`;
  fs.copySync(source, destination, { overwrite: true });
};

export { copyBackend };
