import path from "path";
import fs from "fs-extra";

export const copyBoilerplate = (
  app: string,
  boilerplate: "backend" | "frontend",
  service: "web" | "api",
  name: "nest" | "strapi" | "vite-react" | "nextjs"
) => {
  const source = path.join(
    __dirname,
    `/_templates/boilerplate/${boilerplate}/${name}`
  );
  const destination = `./${app}/apps/${service}`;
  fs.copySync(source, destination, { overwrite: true });
};
