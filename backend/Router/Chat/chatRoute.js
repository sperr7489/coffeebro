const express = require("express");
const app = express();
const router = express.Router();
const { verifyAccessToken } = require("../../config/jwt");
const chatController = require("./chatController");

router.use("/", (req, res) => {});

module.exports = router;
