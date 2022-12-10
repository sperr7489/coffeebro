const express = require("express");
const app = express();
const router = express.Router();
const { verifyAccessToken } = require("../../config/jwt");
const chatController = require("./chatController");

// 유저의 채팅 룸 가져오기
router.get("/rooms", verifyAccessToken, chatController.getChatRoom);

// 유저의 특정 채팅룸 가져오기
router.get("/:chatRoomIdx", verifyAccessToken, chatController.inTheChat);

// 채팅 하기
router.post("/:chatRoomIdx/chat", verifyAccessToken, chatController.chatting);
module.exports = router;
