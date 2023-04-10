import * as dotenv from "dotenv";
import { $ } from "zx";
import { uploadDirectoryToS3 } from "./aws/index.js";
import fs from "fs";
import { getPackageJson } from "./util/getPackageJson.js";
fs.readFileSync;
dotenv.config({ path: "../../.env" });
async function Command() {
    await $ `yarn build`;
    await uploadDirectoryToS3({
        bucketName: "mfa-test-2023",
        folderPath: "./out",
        s3FolderName: getPackageJson().name,
    });
}
Command();
