import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import config from "../config.js";

AWS.config.update({
  accessKeyId: config.awsAccess.key,
  secretAccessKey: config.awsSecret.key,
  region: "us-east-1",
  logger: console
});

const s3 = new AWS.S3();

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.s3Bucket.name,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const uniqueFileName = `${Date.now().toString()}-${file.originalname}`;
      cb(null, uniqueFileName);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
}).single("image");

export default uploadImage;
