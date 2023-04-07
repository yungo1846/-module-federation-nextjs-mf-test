import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";

export const uploadDirectoryToS3 = async ({
  bucketName,
  folderPath,
  s3FolderName,
}: {
  bucketName: string;
  folderPath: string;
  s3FolderName?: string;
}) => {
  const s3Client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
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
    } else {
      const fileStream = fs.createReadStream(filePath);
      const uploadParams = {
        Bucket: bucketName,
        Key: s3Key,
        Body: fileStream,
      };
      const command = new PutObjectCommand(uploadParams);
      await s3Client.send(command);
    }
  }
};
