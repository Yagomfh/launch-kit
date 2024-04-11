import { exec } from "child_process";
import fs from "fs";

const chageVersion = (newVersion) => {
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
    fs.writeFile(filePath, updatedContent, "utf8", (err) => {
      if (err) {
        console.error(`Error writing to file: ${err}`);
        return;
      }
      console.log(`Version number updated to ${newVersion}`);
    });
  });
};

const main = () => {
  const command = "npm version patch";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`${error}`);
      return;
    }

    const version = stdout.replace("\n", "");
    chageVersion(version);
  });
};

main();
