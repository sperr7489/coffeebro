require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3_ACCESSKEY, S3_SECRETKEY, RESION } = process.env;
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: S3_ACCESSKEY,
  secretAccessKey: S3_SECRETKEY,
  region: RESION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "coffeebro",
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동으로 콘텐츠 타입 세팅
    acl: "public-read",
    key: (req, file, cb) => {
      //let extension = path.extname(file.originalname);
      cb(null, file.originalname);
    },
  }),
});

module.exports = upload;
