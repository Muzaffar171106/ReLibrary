const s3 = require('../config/s3');

const getSignedUrl = (key) => {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60 * 60, // 1 hour
  });
};

module.exports = {
  getSignedUrl,
};