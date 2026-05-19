const {
  PutObjectCommand,
} = require('@aws-sdk/client-s3');

const {
  getSignedUrl,
} = require('@aws-sdk/s3-request-presigner');

const s3 = require('../config/s3');

const { v4: uuidv4 } = require('uuid');

const uploadFile = async (
  file,
  folder
) => {
  const key =
    `${folder}/${uuidv4()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,

    Key: key,

    Body: file.buffer,

    ContentType: file.mimetype,
  });

  await s3.send(command);

  return key;
};

const generatePresignedUrl = async (
  key
) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(
    s3,
    command,
    { expiresIn: 3600 }
  );
};

module.exports = {
  uploadFile,
  generatePresignedUrl,
};