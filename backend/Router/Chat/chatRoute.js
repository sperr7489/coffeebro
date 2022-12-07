const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../../config/jwt");
const chatController = require("./chatController");

router.get("/", chatController);

module.exports = router;
