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
router.post("/:chatRoomIdx", verifyAccessToken, chatController.chatting);

// 배달 완료 보내기
router.post(
  "/complete/:chatRoomIdx",
  verifyAccessToken,
  chatController.completeDelivery
);

// 평점을 메기고 chatting방의 status가 1로 바뀐다. => 거래가 완료되었다는 뜻.
router.patch(
  "/complete/delivery/:chatRoomIdx",
  verifyAccessToken,
  chatController.scoreAgent
);

module.exports = router;
