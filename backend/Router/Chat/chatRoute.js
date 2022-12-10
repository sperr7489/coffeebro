const express = require("express");
const app = express();
const router = express.Router();
const { verifyAccessToken } = require("../../config/jwt");
const chatController = require("./chatController");

// 유저의 채팅 룸 가져오기
router.get("/room", verifyAccessToken, chatController.getChatRoom);

// 유저가 채팅방에 들어가기
router.get("/:chatRoomIdx", verifyAccessToken, chatController.inTheChat);

module.exports = router;
