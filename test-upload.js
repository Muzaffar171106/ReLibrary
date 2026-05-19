const fs = require('fs');

const {
  S3Client,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

require('dotenv').config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,

  credentials: {
    accessKeyId:
      process.env.AWS_ACCESS_KEY,

    secretAccessKey:
      process.env.AWS_SECRET_KEY,
  },
});

const run = async () => {
  const fileContent = fs.readFileSync(
    './test.jpg'
  );

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,

    Key: 'test/test.jpg',

    Body: fileContent,

    ContentType: 'image/jpg',
  });

  await s3.send(command);

  console.log('Uploaded!');
};

run();