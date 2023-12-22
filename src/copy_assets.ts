import * as fs from "fs";
import * as path from "path";

fs.mkdirSync(path.join(__dirname, "../dist/templates"), { recursive: true });

const TEMPLATES_PATH = path.join(__dirname, "templates");

const DIST_PATH = path.join(__dirname, "../dist/templates");

const templateFiles = fs.readdirSync(TEMPLATES_PATH);

templateFiles.forEach((file) => {
  fs.copyFileSync(path.join(TEMPLATES_PATH, file), path.join(DIST_PATH, file));
});
