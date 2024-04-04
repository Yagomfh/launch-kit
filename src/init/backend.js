import path from "path";
import fs from "fs-extra";
/**
 * Copy the backend based on the name provided
 *
 * @param {string} app
 * @param {"nest" | "strapi"} name
 * @returns void
 */

const sourceDir = path
  .dirname(new URL(import.meta.url).pathname)
  .split("/src")[0];

const copyBackend = (app, name) => {
  const source = `${sourceDir}/_templates/boilerplate/backend/${name}`;
  const destination = `./${app}/apps/api`;
  fs.copySync(source, destination, { overwrite: true });
};

export { copyBackend };
