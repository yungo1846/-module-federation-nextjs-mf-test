import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import path from "path";
import fs from "fs";
import mime from "mime-types";

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
      const mimeType = mime.lookup(filePath);
      const contentType = mimeType ? mimeType : undefined;
      const uploadParams: PutObjectCommandInput = {
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

export const createInvalidation = async () => {
  const client = new CloudFrontClient({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });

  const input = {
    DistributionId: "E2WJ1MYYQAWIVW",
    InvalidationBatch: {
      Paths: {
        Quantity: 1,
        Items: ["/*"],
      },
      CallerReference: "deploy",
    },
  };
  const command = new CreateInvalidationCommand(input);
  const response = await client.send(command);
};

// {
//   "Location": "https://cloudfront.amazonaws.com/2020-05-31/distribution/E2WJ1MYYQAWIVW/invalidation/I8ZX6NV983BFUW3STI20B4QA63",
//   "Invalidation": {
//       "Id": "I8ZX6NV983BFUW3STI20B4QA63",
//       "Status": "InProgress",
//       "CreateTime": "2023-04-10T09:46:41.297000+00:00",
//       "InvalidationBatch": {
//           "Paths": {
//               "Quantity": 1,
//               "Items": [
//                   "/*"
//               ]
//           },
//           "CallerReference": "cli-1681119999-865658"
//       }
//   }
// }
