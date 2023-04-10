import { S3Client, PutObjectCommand, } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";
import mime from "mime-types";
export const uploadDirectoryToS3 = async ({ bucketName, folderPath, s3FolderName, }) => {
    const s3Client = new S3Client({
        region: "ap-northeast-2",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const s3Key = s3FolderName ? `${s3FolderName}/${file}` : file;
        if (fs.lstatSync(filePath).isDirectory()) {
            await uploadDirectoryToS3({
                bucketName,
                folderPath: filePath,
                s3FolderName: s3Key,
            });
        }
        else {
            const fileStream = fs.createReadStream(filePath);
            const mimeType = mime.lookup(filePath);
            const contentType = mimeType ? mimeType : undefined;
            const uploadParams = {
                ACL: "public-read",
                Bucket: bucketName,
                Key: s3Key,
                Body: fileStream,
                ContentType: contentType,
            };
            const command = new PutObjectCommand(uploadParams);
            await s3Client.send(command);
        }
    }
};
