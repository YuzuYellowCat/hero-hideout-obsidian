import fs from "fs";
import path from "path";
import fsExtra from "fs-extra";

const fsPromises = fs.promises;
const targetDir = "./public/images";
const imagesDir = "./src/website-content/images";

await fsExtra.emptyDir(targetDir);
await fsExtra.copy(imagesDir, targetDir);
