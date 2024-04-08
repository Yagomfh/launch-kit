import path from "path";
import fs from "fs-extra";

const copyBackend = (app: string, name: "nest" | "strapi") => {
  const source = path.join(
    __dirname,
    `/_templates/boilerplate/backend/${name}`
  );
  const destination = `./${app}/apps/api`;
  fs.copySync(source, destination, { overwrite: true });
};

export { copyBackend };
