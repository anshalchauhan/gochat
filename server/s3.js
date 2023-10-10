// A module for creating random strings and performing hashing, encryption, decryption
const crypto = require("crypto");

// util module
const { promisify } = require("util");

// Dotenv loads environment variables from a .env file into process.env.
const dotenv = require("dotenv");

// AWS
const aws = require("aws-sdk");

// catchAsync function to handle catch blocks, we will wrap all our handler(controller) functions in this
const catchAsync = require("./utils/catchAsync");

// AWS Variables
const bucketName = process.env.S3_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_S3_REGION;

// Promisifying randombytes function
const randomBytes = promisify(crypto.randomBytes);

dotenv.config({ path: "./config.env" });

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

exports.generateUploadURL = catchAsync(async (req, res, next) => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  res.status(200).json({
    status: "success",
    data: uploadURL,
    message: "Upload Url created!",
  });
});
