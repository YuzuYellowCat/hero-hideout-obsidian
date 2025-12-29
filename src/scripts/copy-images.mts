import fsExtra from "fs-extra";

const targetDir = "./public/images";
const imagesDir = "./src/website-content/images";

await fsExtra.emptyDir(targetDir);
await fsExtra.copy(imagesDir, targetDir);
