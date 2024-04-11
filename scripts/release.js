import { exec, execSync } from "child_process";
import fs from "fs";

const changeVersion = async (newVersion) => {
  const filePath = "./src/bin.ts";
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      return;
    }

    // Replace the version number with the new one
    const updatedContent = data.replace(
      /const version = ".+"/,
      `const version = "${newVersion}"`
    );

    // Write the modified content back to the file
    fs.writeFileSync(filePath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error(`Error writing to file: ${err}`);
        return;
      }
      console.log(`Version number updated to ${newVersion}`);
    });

    execSync("git add .");
    execSync(`git commit -m "feat: add version ${newVersion}"`);
    execSync("git push origin main");
  });
};

const main = async () => {
  exec("npm version patch", (error, stdout, stderr) => {
    if (error) {
      console.error(`${error}`);
      return;
    }

    const version = stdout.replace("\n", "");
    changeVersion(version);
  });
};

main();
