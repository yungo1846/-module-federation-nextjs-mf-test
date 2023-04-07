import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs";

interface Deployment {
  id: string;
  date: number;
  commitId: string;
  status?: "start" | "done" | "fail";
  link?: string;
}

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadFilesInFolderToS3 = async ({
  bucketName,
  folderPath,
  s3FolderName,
}: {
  bucketName: string;
  folderPath: string;
  s3FolderName: string;
}) => {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const key = `${s3FolderName}/${file}`;

    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileStream,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
  }
};
