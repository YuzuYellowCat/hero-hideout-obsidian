import fsExtra, { ensureDir } from "fs-extra";
import nodeDir from "node-dir";
import sharp from "sharp";

const TARGET_DIRECTORIES = {
    FULL: "public/images/full",
    FULL_OPTIMIZED: "public/images/full-optimized",
    THUMBNAIL: "public/images/thumbnail",
};

const BASE_TARGET_DIRECTORY = "public/images";
const CORE_IMAGE_DIRECTORY = "./src/website-content/images";

await fsExtra.emptyDir(BASE_TARGET_DIRECTORY);
await fsExtra.copy(CORE_IMAGE_DIRECTORY, TARGET_DIRECTORIES.FULL);

const getFilesAsync = (dir) => {
    return new Promise((resolve) => {
        nodeDir.files(dir, (err, files) => {
            if (err) throw err;
            resolve(files);
        });
    });
};

const fullOptimizedImages = await getFilesAsync(TARGET_DIRECTORIES.FULL);

const runImageProcessing = async (directory, callback) => {
    await fullOptimizedImages.forEach(async (imagePath) => {
        const basePath = imagePath.replace(TARGET_DIRECTORIES.FULL, "");
        // First, check if the dir exists
        const correctDir = basePath.split("/");
        correctDir.pop();
        await ensureDir(`${directory}/${correctDir.join("/")}`);

        const [fileName, extension] = basePath.split(".");
        if (!fileName || fileName.endsWith("/")) {
            return;
        }

        const mySharp = sharp(imagePath, { animated: extension === "gif" });
        callback(mySharp).toFile(`${directory}${fileName}.webp`);

        // sharp(imagePath, { animated: extension === "gif" })
        //     .webp({ effort: 6 })
        //     .toFile(`${directory}${fileName}.webp`);
    });
};

await runImageProcessing(TARGET_DIRECTORIES.FULL_OPTIMIZED, (mySharp) => {
    return mySharp.webp({ effort: 6 });
});

await runImageProcessing(TARGET_DIRECTORIES.THUMBNAIL, (mySharp) => {
    return mySharp.webp({ effort: 6 }).resize(300, 300);
});
